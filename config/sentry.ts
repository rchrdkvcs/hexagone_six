import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import env from '#start/env'

Sentry.init({
  dsn: env.get('BACK_SENTRY_DSN'),
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
  enableLogs: true,
  sendDefaultPii: true,
  environment: env.get('SENTRY_ENVIRONMENT'),
})
