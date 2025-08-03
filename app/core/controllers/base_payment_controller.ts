import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PaymentService, PaymentConfig } from '#core/services/payment_service'

@inject()
export default abstract class BasePaymentController {
  constructor(protected paymentService: PaymentService) {}

  /**
   * Méthode abstraite que les contrôleurs enfants doivent implémenter
   * pour définir la configuration de paiement
   */
  protected abstract getPaymentConfig(context: HttpContext): Promise<PaymentConfig>

  /**
   * Créer une session de checkout
   */
  async checkout(context: HttpContext) {
    try {
      const { response, auth } = context
      const user = await auth.authenticate()

      if (!user) {
        return response.status(401).json({ error: 'User not authenticated' })
      }

      const config = await this.getPaymentConfig(context)
      const result = await this.paymentService.createCheckoutSession(user, config)

      if (!result.success) {
        return response.status(500).json({ error: result.error })
      }

      return response.json({ sessionId: result.sessionId, url: result.url })
    } catch (error) {
      console.error('Checkout error:', error)
      return context.response.status(500).json({ error: 'Failed to create checkout session' })
    }
  }

  /**
   * Traiter le succès d'un paiement
   */
  async success(context: HttpContext) {
    try {
      const { request, auth } = context
      const user = await auth.authenticate()
      const sessionId = request.input('session_id')

      if (!sessionId) {
        return context.response.status(400).json({ error: 'Session ID is required' })
      }

      const config = await this.getPaymentConfig(context)
      const result = await this.paymentService.processSuccessfulPayment(user, sessionId, config)

      if (!result.success) {
        console.error('Payment processing failed:', result.error)
      }

      return await this.renderSuccessPage(context)
    } catch (error) {
      console.error('Error processing payment success:', error)
      return await this.renderSuccessPage(context)
    }
  }

  /**
   * Traiter l'annulation d'un paiement
   */
  async cancel(context: HttpContext) {
    return await this.renderCancelPage(context)
  }

  /**
   * Méthode abstraite pour rendre la page de succès
   */
  protected abstract renderSuccessPage(context: HttpContext): Promise<any>

  /**
   * Méthode abstraite pour rendre la page d'annulation
   */
  protected abstract renderCancelPage(context: HttpContext): Promise<any>
}
