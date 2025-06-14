import { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import { StripeService } from '#core/services/stripe_service'

export default class PaymentsController {
  /**
   * Create a checkout session and redirect to Stripe
   */
  async checkout({ request, response }: HttpContext) {
    const stripeService = new StripeService()
    const { email } = request.only(['email'])

    try {
      const session = await stripeService.createCheckoutSession({
        amount: 90,
        productName: 'HexaBoost Optimization',
        successUrl: `${env.get('APP_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${env.get('APP_URL')}/payment/cancel`,
        customerEmail: email,
      })

      return response.json({ sessionId: session.id, url: session.url })
    } catch (error) {
      console.error('Stripe error:', error)
      return response.status(500).json({ error: 'Failed to create checkout session' })
    }
  }

  /**
   * Payment success page
   */
  async success({ inertia }: HttpContext) {
    return inertia.render('payment/success')
  }

  /**
   * Payment cancel page
   */
  async cancel({ inertia }: HttpContext) {
    return inertia.render('payment/cancel')
  }
}
