/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { createApp, DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import '~/styles/fonts.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import DefaultLayout from '~/layouts/DefaultLayout.vue'

createInertiaApp({
  progress: { color: '#00ffe5' },

  title: (title) => `R6Calls | ${title}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    ).then((page) => {
      if (!page.default.layout) {
        page.default.layout = DefaultLayout
      }
      return page
    })
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
