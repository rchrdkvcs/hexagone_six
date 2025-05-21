import { createApp, DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import '../assets/styles/main.css'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Default from '~/layouts/default.vue'
import Admin from '~/layouts/admin.vue'
import ui from '@nuxt/ui/vue-plugin'

createInertiaApp({
  progress: { color: '#ff6467' },

  title: (title) => `R6Calls | ${title}`,

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
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ui)
      .mount(el)
  },
})
