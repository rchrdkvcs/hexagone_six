import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PaymentService, PaymentConfig } from '#core/services/payment_service'
import BasePaymentController from '#core/controllers/base_payment_controller'
import Guide from '#guides/models/guide'

@inject()
export default class PaymentsGuideController extends BasePaymentController {
  constructor(paymentService: PaymentService) {
    super(paymentService)
  }

  protected async getPaymentConfig({ params, request }: HttpContext): Promise<PaymentConfig> {
    // Pour le checkout, utiliser l'ID des paramètres
    if (params?.id) {
      const guide = await Guide.findOrFail(params.id)
      return PaymentService.createGuideConfig(guide)
    }

    // Pour le success, récupérer l'ID depuis les métadonnées Stripe
    const sessionId = request.input('session_id')
    if (sessionId) {
      const customerData = await this.paymentService.stripeService.getCustomerFromSession(sessionId)
      const guideId = customerData.session.metadata?.guideId

      if (!guideId) {
        throw new Error('Guide ID not found in session metadata')
      }

      const guide = await Guide.findOrFail(guideId)
      return PaymentService.createGuideConfig(guide)
    }

    throw new Error('Unable to determine guide for payment configuration')
  }

  protected async renderSuccessPage({ inertia }: HttpContext) {
    return inertia.render('guide/payment/success')
  }

  protected async renderCancelPage({ inertia }: HttpContext) {
    return inertia.render('guide/payment/cancel')
  }
}
