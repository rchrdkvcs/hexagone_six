import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PaymentService, PaymentConfig } from '#core/services/payment_service'
import BasePaymentController from '#core/controllers/base_payment_controller'
import { DiscordColors } from '#core/services/discord_service'

/**
 * Exemple d'utilisation du système de paiement modulaire
 * Ce contrôleur montre comment créer un nouveau type de produit facilement
 */
@inject()
export default class ExamplePaymentController extends BasePaymentController {
  constructor(paymentService: PaymentService) {
    super(paymentService)
  }

  protected async getPaymentConfig({ params }: HttpContext): Promise<PaymentConfig> {
    // Exemple pour un produit custom (ex: coaching, formation, etc.)
    const productId = params.id

    return {
      product: {
        id: productId,
        name: 'Formation Rainbow Six Siege',
        price: 4999, // 49.99€ en centimes
        type: 'subscription', // ou tout autre type personnalisé
        metadata: {
          duration: '1-month',
          level: 'advanced',
          customField: 'example-value',
        },
      },
      successUrl: `${process.env.APP_URL}/formation/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.APP_URL}/formation/payment/cancel`,
      webhookUrl: process.env.DISCORD_FORMATION_WEBHOOK_URL,
      discordNotification: {
        title: '🎓 Nouvelle inscription formation',
        description: "Un utilisateur s'est inscrit à une formation Rainbow Six Siege.",
        color: DiscordColors.SUCCESS,
      },
    }
  }

  protected async renderSuccessPage({ inertia }: HttpContext) {
    return inertia.render('formation/payment/success')
  }

  protected async renderCancelPage({ inertia }: HttpContext) {
    return inertia.render('formation/payment/cancel')
  }
}

/**
 * Exemple d'utilisation directe du PaymentService (sans hériter de BasePaymentController)
 */
@inject()
export class DirectPaymentExample {
  constructor(private paymentService: PaymentService) {}

  async createCustomPayment({ auth }: HttpContext) {
    const user = await auth.authenticate()

    // Configuration personnalisée
    const config: PaymentConfig = {
      product: {
        name: 'Produit personnalisé',
        price: 1999, // 19.99€
        type: 'guide',
      },
      successUrl: 'https://exemple.com/success',
      cancelUrl: 'https://exemple.com/cancel',
    }

    // Créer la session de paiement
    const result = await this.paymentService.createCheckoutSession(user, config)

    if (result.success) {
      // Rediriger vers Stripe Checkout
      return { checkoutUrl: result.url }
    } else {
      throw new Error(result.error)
    }
  }
}
