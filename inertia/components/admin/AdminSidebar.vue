<script lang="ts" setup>
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Principal',
      icon: 'lucide:home',
      defaultOpen: true,
      children: [
        {
          label: 'Dashboard',
          icon: 'lucide:home',
          to: '/admin',
        },
        {
          label: 'Cartes',
          icon: 'lucide:map',
          to: '/admin/cartes',
        },
      ],
    },
    {
      label: 'Gestion',
      icon: 'i-lucide-database',
      defaultOpen: true,
      children: [
        {
          label: 'Utilisateurs',
          icon: 'lucide:users',
          to: '/admin/utilisateurs',
        },
        {
          label: 'Marqueurs',
          icon: 'lucide:map-pin',
          to: '/admin/marqueurs',
        },
        {
          label: 'Suggestions',
          icon: 'lucide:message-square',
          to: '/admin/suggestions',
        },
      ],
    },
    {
      label: 'Système',
      icon: 'i-lucide-box',
      to: '/components',
      active: true,
      defaultOpen: true,
      children: [
        {
          label: 'Paramètres',
          icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          to: '/components/link',
        },
        {
          label: 'Logs',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/components/modal',
        },
      ],
    },
  ],
])
</script>

<template>
  <UNavigationMenu
    :items="items"
    :ui="{
      list: 'p-2',
      link: 'cursor-pointer py-2',
    }"
    class="w-64 bg-default/75 backdrop-blur-md border-r border-default"
    orientation="vertical"
  />
</template>
