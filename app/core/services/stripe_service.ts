import Stripe from 'stripe'
import stripeConfig from '#config/stripe'

export class StripeService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(stripeConfig.secretKey)
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(amount: number, currency: string = 'eur') {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
    })
  }

  /**
   * Create a checkout session for a product
   */
  async createCheckoutSession(params: {
    amount: number
    currency?: string
    successUrl: string
    cancelUrl: string
    customerEmail?: string
    productName: string
  }) {
    const { amount, currency = 'eur', successUrl, cancelUrl, customerEmail, productName } = params

    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
    })
  }
}
