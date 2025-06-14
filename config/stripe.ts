// config/stripe.ts
import env from '#start/env'

export default {
  secretKey: env.get('STRIPE_SECRET_KEY'),
  publishableKey: env.get('STRIPE_PUBLISHABLE_KEY'),
  webhookSecret: env.get('STRIPE_WEBHOOK_SECRET'),
}
