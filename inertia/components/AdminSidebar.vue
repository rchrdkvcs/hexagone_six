<script lang="ts" setup>
import { usePage } from '@inertiajs/vue3'
import AppButton from '~/components/utils/AppButton.vue'

const menuItems = [
  {
    section: 'Principal',
    items: [
      { name: 'Dashboard', icon: 'i-mdi:view-dashboard', href: '/admin' },
      { name: 'Cartes', icon: 'i-mdi:map', href: '/admin/cartes' },
    ],
  },
  {
    section: 'Gestion',
    items: [
      { name: 'Utilisateurs', icon: 'i-mdi:account-multiple', href: '/admin/users' },
      { name: 'Marqueurs', icon: 'i-mdi:map-marker', href: '/admin/markers' },
      { name: 'Suggestions', icon: 'i-mdi:lightbulb', href: '/admin/suggestions' },
    ],
  },
  {
    section: 'Système',
    items: [
      { name: 'Paramètres', icon: 'i-mdi:cog', href: '/admin/settings' },
      { name: 'Logs', icon: 'i-mdi:clipboard-text', href: '/admin/logs' },
    ],
  },
]

const page = usePage()

const isActive = (href: string) => {
  return page.url.startsWith(href)
}
</script>

<template>
  <aside
    class="size-full backdrop-blur-md bg-primary-800/50 border-r border-white/5 py-6 px-4 space-y-6"
  >
    <!-- Header -->
    <h1 class="text-xl font-bold truncate text-center">Administration</h1>

    <!-- Menu -->
    <div class="flex-grow overflow-auto">
      <div v-for="(section, idx) in menuItems" :key="idx" class="mb-6">
        <p class="text-white/50 text-sm mb-2">
          {{ section.section }}
        </p>

        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.name">
            <AppButton
              :class="
                isActive(item.href) ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-white/80'
              "
              :href="item.href"
              :icon="item.icon"
              :label="item.name"
              class="!justify-start !font-medium"
              variant="ghost"
            />
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
