import { createApp, DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import '../assets/styles/main.css'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Default from '~/layouts/default.vue'
import Admin from '~/layouts/admin.vue'
import ui from '@nuxt/ui/vue-plugin'
import * as Sentry from '@sentry/vue'

createInertiaApp({
  progress: { color: '#ff6467' },

  title: (title) => (title ? `Hexagone Six - ${title}` : 'Hexagone Six'),

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    ).then((page) => {
      if (name.startsWith('admin/')) {
        page.default.layout = Admin
      } else if (!page.default.layout) {
        page.default.layout = Default
      }
      return page
    })
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
    const env = (props.initialPage.props as any).env

    Sentry.init({
      app,
      dsn: env.FRONT_SENTRY_DSN,
      sendDefaultPii: true,
      integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
      tracesSampleRate: 1.0,
      tracePropagationTargets: ['localhost', 'https://hexagone6.fr'],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      enableLogs: true,
      environment: env.SENTRY_ENVIRONMENT,
    })

    app.use(plugin).use(ui).mount(el)
  },
})
