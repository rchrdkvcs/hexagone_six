import { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { StripeService } from '#core/services/stripe_service'
import DiscordService, { DiscordColors } from '#core/services/discord_service'

@inject()
export default class PaymentsController {
  constructor(
    private stripeService: StripeService,
    private discordService: DiscordService
  ) {}

  async checkout({ response, auth }: HttpContext) {
    const user = await auth.authenticate()

    if (!user || user.provider !== 'discord') {
      return response.status(401).json({ error: 'User not authenticated' })
    }

    try {
      const session = await this.stripeService.createCheckoutSession({
        amount: 90,
        productName: 'HexaBoost Optimization',
        successUrl: `${env.get('APP_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${env.get('APP_URL')}/payment/cancel`,
        customerEmail: user.email,
      })

      return response.json({ sessionId: session.id, url: session.url })
    } catch (error) {
      console.error('Stripe error:', error)
      return response.status(500).json({ error: 'Failed to create checkout session' })
    }
  }

  async success({ request, inertia, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const sessionId = request.input('session_id')

    if (!sessionId) {
      return response.status(400).json({ error: 'Session ID is required' })
    }

    try {
      const customerData = await this.stripeService.getCustomerFromSession(sessionId)

      const salesEmbed = this.discordService
        .createEmbed()
        .setTitle('🎉 Nouvelle commande HexaBoost')
        .setDescription('Un utilisateur a passé une commande sur HexaBoost.')
        .addField('Utilisateur', `<@${user.provider_id}>`)
        .addField('Client', customerData.name || 'Non spécifié')
        .addField('Email', customerData.email || 'Non spécifié')
        .addField('Téléphone', customerData.phone || 'Non spécifié')
        .addField('Session ID', sessionId)
        .setColor(DiscordColors.SUCCESS)
        .setTimestamp()

      await salesEmbed.send(undefined, env.get('DISCORD_HEXABOOST_WEBHOOK_URL'))

      return inertia.render('payment/success')
    } catch (error) {
      console.error('Error retrieving customer data:', error)

      const fallbackEmbed = this.discordService
        .createEmbed()
        .setTitle('⚠️ Nouvelle commande HexaBoost (données partielles)')
        .setDescription(
          "Un utilisateur a passé une commande, mais les détails du client n'ont pas pu être récupérés."
        )
        .addField('Session ID', sessionId)
        .setColor(DiscordColors.WARNING)
        .setTimestamp()

      await fallbackEmbed.send(undefined, env.get('DISCORD_HEXABOOST_WEBHOOK_URL'))

      return inertia.render('payment/success')
    }
  }

  async cancel({ inertia }: HttpContext) {
    return inertia.render('payment/cancel')
  }
}
