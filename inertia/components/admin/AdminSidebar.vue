<script lang="ts" setup>
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Utilisateurs',
      icon: 'lucide:users',
      to: '/admin/utilisateurs',
    },
    {
      label: 'Calls',
      icon: 'lucide:map-pin',
      to: '/admin/calls',
    },
    {
      label: 'Suggestions',
      icon: 'lucide:message-square',
      to: '/admin/suggestions',
    },
    {
      label: 'Votes',
      icon: 'lucide:thumbs-up',
      to: '/admin/votes',
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
    class="w-64 bg-default backdrop-blur-md border-r border-default"
    orientation="vertical"
  >
    <template #list-leading>
      <div class="flex items-center gap-2 px-4 pt-4">
        <UButton to="/" icon="lucide:arrow-left" color="neutral" variant="soft" />
        <h1 class="text-2xl font-semibold">Administration</h1>
      </div>
    </template>
  </UNavigationMenu>
</template>
