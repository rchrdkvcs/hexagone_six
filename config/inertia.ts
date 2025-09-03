import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import User from '#users/models/user'
import env from '#start/env'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    user: (ctx) => {
      const user = ctx.auth ? ctx.auth.user : null

      if (!user) {
        return null
      }

      return user
    },
    env: () => ({
      SENTRY_ENVIRONMENT: env.get('NODE_ENV'),
      FRONT_SENTRY_DSN: env.get('FRONT_SENTRY_DSN'),
    }),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.ts',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {
    user: User
    env: {
      SENTRY_ENVIRONMENT: string
      FRONT_SENTRY_DSN: string
    }
  }
}
