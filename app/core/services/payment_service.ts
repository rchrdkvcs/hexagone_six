import { inject } from '@adonisjs/core'
import { StripeService } from '#core/services/stripe_service'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import env from '#start/env'
import User from '#users/models/user'
import Purchase from '#guides/models/purchase'

export interface PaymentProduct {
  id?: string | number
  name: string
  price: number
  type: 'guide' | 'hexaboost' | 'subscription'
  metadata?: Record<string, any>
}

export interface PaymentConfig {
  product: PaymentProduct
  successUrl: string
  cancelUrl: string
  webhookUrl?: string
  discordNotification?: {
    title: string
    description: string
    color?: (typeof DiscordColors)[keyof typeof DiscordColors]
  }
}

export interface PaymentResult {
  success: boolean
  sessionId?: string
  url?: string
  error?: string
  purchase?: Purchase
}

@inject()
export class PaymentService {
  constructor(
    public stripeService: StripeService,
    private discordService: DiscordService
  ) {}

  /**
   * Créer une session de paiement
   */
  async createCheckoutSession(user: User, config: PaymentConfig): Promise<PaymentResult> {
    try {
      // Validation des données
      if (!user.email) {
        return { success: false, error: 'User email is required' }
      }

      if (config.product.price <= 0) {
        return { success: false, error: 'Invalid product price' }
      }

      // Créer la session Stripe
      const session = await this.stripeService.createCheckoutSession({
        amount: config.product.price,
        productName: config.product.name,
        successUrl: config.successUrl,
        cancelUrl: config.cancelUrl,
        customerEmail: user.email,
        metadata: {
          userId: user.id.toString(),
          productType: config.product.type,
          productId: config.product.id?.toString() || '',
          ...config.product.metadata,
        },
      })

      return {
        success: true,
        sessionId: session.id,
        url: session.url || undefined,
      }
    } catch (error) {
      console.error('Payment service error:', error)
      return {
        success: false,
        error: 'Failed to create checkout session',
      }
    }
  }

  /**
   * Traiter le succès d'un paiement
   */
  async processSuccessfulPayment(
    user: User,
    sessionId: string,
    config: PaymentConfig
  ): Promise<PaymentResult> {
    try {
      // Récupérer les données de la session Stripe
      const customerData = await this.stripeService.getCustomerFromSession(sessionId)

      // Créer l'enregistrement d'achat
      const purchase = await this.createPurchaseRecord(user, customerData, config.product)

      // Envoyer la notification Discord si configurée
      if (config.discordNotification && config.webhookUrl) {
        await this.sendDiscordNotification(
          user,
          customerData,
          sessionId,
          config.discordNotification,
          config.webhookUrl
        )
      }

      return {
        success: true,
        purchase,
      }
    } catch (error) {
      console.error('Error processing successful payment:', error)

      // Envoyer une notification d'erreur si un webhook est configuré
      if (config.webhookUrl) {
        await this.sendErrorNotification(sessionId, config.webhookUrl)
      }

      return {
        success: false,
        error: 'Failed to process payment',
      }
    }
  }

  /**
   * Créer un enregistrement d'achat
   */
  private async createPurchaseRecord(
    user: User,
    customerData: any,
    product: PaymentProduct
  ): Promise<Purchase> {
    return await Purchase.create({
      userId: user.id,
      productId: product.id?.toString() || undefined,
      productName: product.name,
      productType: product.type,
      totalAmount: customerData.session.amount_total,
      currency: customerData.session.currency,
      stripeSessionId: customerData.session.id,
      customerData: {
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.billing_address,
      },
      metadata: product.metadata || {},
    })
  }

  /**
   * Envoyer une notification Discord
   */
  private async sendDiscordNotification(
    user: User,
    customerData: any,
    sessionId: string,
    notification: NonNullable<PaymentConfig['discordNotification']>,
    webhookUrl: string
  ): Promise<void> {
    const embed = this.discordService
      .createEmbed()
      .setTitle(notification.title)
      .setDescription(notification.description)
      .addField('Utilisateur', user.provider === 'discord' ? `<@${user.provider_id}>` : user.email)
      .addField('Client', customerData.name || 'Non spécifié')
      .addField('Email', customerData.email || 'Non spécifié')
      .addField('Téléphone', customerData.phone || 'Non spécifié')
      .addField('Montant', `${(customerData.session.amount_total / 100).toFixed(2)}€`)
      .addField('Session ID', sessionId)
      .setColor(notification.color || DiscordColors.SUCCESS)
      .setTimestamp()

    await embed.send(undefined, webhookUrl)
  }

  /**
   * Envoyer une notification d'erreur
   */
  private async sendErrorNotification(sessionId: string, webhookUrl: string): Promise<void> {
    const embed = this.discordService
      .createEmbed()
      .setTitle("⚠️ Erreur lors du traitement d'un paiement")
      .setDescription("Un paiement a été effectué mais n'a pas pu être traité correctement.")
      .addField('Session ID', sessionId)
      .setColor(DiscordColors.WARNING)
      .setTimestamp()

    await embed.send(undefined, webhookUrl)
  }

  /**
   * Créer la configuration pour HexaBoost
   */
  static createHexaBoostConfig(): PaymentConfig {
    return {
      product: {
        name: 'HexaBoost Optimization',
        price: 90,
        type: 'hexaboost',
      },
      successUrl: `${env.get('APP_URL')}/hexaboost/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${env.get('APP_URL')}/hexaboost/payment/cancel`,
      webhookUrl: env.get('DISCORD_HEXABOOST_WEBHOOK_URL'),
      discordNotification: {
        title: '🎉 Nouvelle commande HexaBoost',
        description: 'Un utilisateur a passé une commande sur HexaBoost.',
        color: DiscordColors.SUCCESS,
      },
    }
  }

  /**
   * Créer la configuration pour un guide
   */
  static createGuideConfig(guide: {
    id: string | number
    title: string
    price: number
  }): PaymentConfig {
    return {
      product: {
        id: guide.id,
        name: `Guide: ${guide.title}`,
        price: guide.price,
        type: 'guide',
        metadata: {
          guideId: guide.id.toString(),
        },
      },
      successUrl: `${env.get('APP_URL')}/guide/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${env.get('APP_URL')}/guide/payment/cancel`,
      webhookUrl: env.get('DISCORD_GUIDES_WEBHOOK_URL') || env.get('DISCORD_HEXABOOST_WEBHOOK_URL'),
      discordNotification: {
        title: '📚 Nouveau guide acheté',
        description: `Un utilisateur a acheté le guide "${guide.title}".`,
        color: DiscordColors.SUCCESS,
      },
    }
  }
}
