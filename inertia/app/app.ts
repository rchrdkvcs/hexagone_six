/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import type { DefineComponent } from 'vue'
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import 'virtual:uno.css'
import '../styles/fonts.css'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true })
    let page = pages[`../pages/${name}.vue`]
    page.default.layout = page.default.layout || DefaultLayout
    return page
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
