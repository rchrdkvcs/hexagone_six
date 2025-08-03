import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PaymentService, PaymentConfig } from '#core/services/payment_service'
import BasePaymentController from '#core/controllers/base_payment_controller'

@inject()
export default class PaymentsController extends BasePaymentController {
  constructor(paymentService: PaymentService) {
    super(paymentService)
  }

  /**
   * Vérification spécifique pour HexaBoost (Discord requis)
   */
  async checkout(context: HttpContext) {
    const { response, auth } = context
    const user = await auth.authenticate()

    if (!user || user.provider !== 'discord') {
      return response.status(401).json({ error: 'Discord authentication required for HexaBoost' })
    }

    return super.checkout(context)
  }

  protected async getPaymentConfig(_context: HttpContext): Promise<PaymentConfig> {
    return PaymentService.createHexaBoostConfig()
  }

  protected async renderSuccessPage({ inertia }: HttpContext) {
    return inertia.render('hexaboost/payment/success')
  }

  protected async renderCancelPage({ inertia }: HttpContext) {
    return inertia.render('hexaboost/payment/cancel')
  }
}
