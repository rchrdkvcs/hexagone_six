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

    let customerId: string | undefined

    // Si un email est fourni, créer ou récupérer le customer
    if (customerEmail) {
      try {
        // Rechercher si un customer existe déjà avec cet email
        const existingCustomers = await this.stripe.customers.list({
          email: customerEmail,
          limit: 1,
        })

        if (existingCustomers.data.length > 0) {
          customerId = existingCustomers.data[0].id
        } else {
          // Créer un nouveau customer
          const customer = await this.stripe.customers.create({
            email: customerEmail,
          })
          customerId = customer.id
        }
      } catch (error) {
        console.warn('Failed to create/retrieve customer:', error)
        // Continuer sans customer si ça échoue
      }
    }

    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'link'],
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
      customer: customerId, // Utiliser l'ID du customer au lieu de customer_email
      customer_email: customerId ? undefined : customerEmail, // Fallback si pas de customer
      phone_number_collection: { enabled: true }, // Collecter le numéro de téléphone
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'], // Limiter aux pays francophones
      },
    })
  }

  /**
   * Get customer data from checkout session
   */
  /**
   * Get customer data from checkout session
   */
  async getCustomerFromSession(sessionId: string) {
    try {
      // Retrieve checkout session with expanded details
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer', 'payment_intent', 'customer.shipping', 'customer.invoice_settings'],
      })

      // Prepare basic session data
      const sessionData = {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        created: session.created,
      }

      // If customer exists, retrieve their details
      if (session.customer) {
        let customer: Stripe.Customer
        if (typeof session.customer === 'string') {
          customer = (await this.stripe.customers.retrieve(session.customer, {
            expand: ['shipping', 'invoice_settings.default_payment_method'],
          })) as Stripe.Customer
        } else {
          customer = session.customer as Stripe.Customer
        }

        // Get billing address from payment method if available
        let billingAddress = customer.address

        // Get phone number either from customer or session details
        const phone = customer.phone || session.customer_details?.phone

        return {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          phone: phone,
          address: billingAddress,
          billing_address: billingAddress, // Explicit billing address field
          created: customer.created,
          description: customer.description,
          metadata: customer.metadata,
          session: sessionData,
        }
      }

      // If no customer, use available data in the session
      return {
        id: null,
        email: session.customer_email || session.customer_details?.email,
        name: session.customer_details?.name,
        phone: session.customer_details?.phone,
        address: session.customer_details?.address,
        billing_address: session.customer_details?.address, // Explicit billing address field
        created: null,
        description: null,
        metadata: {},
        session: sessionData,
      }
    } catch (error) {
      throw new Error(`Failed to retrieve customer from session: ${error.message}`)
    }
  }
}
