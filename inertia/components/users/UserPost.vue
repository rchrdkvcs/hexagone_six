<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownMenuItem } from '@nuxt/ui'

const dropdownItems = ref<DropdownMenuItem[]>([
  {
    label: 'Signaler',
    icon: 'lucide:flag',
  },
  {
    label: 'Partager',
    icon: 'lucide:share-2',
  },
])
</script>

<template>
  <div class="flex flex-col gap-2 p-2 rounded-md hover:bg-muted group">
    <div class="flex items-center gap-2 relative">
      <UAvatar class="w-8 h-8" src="https://avatar.iran.liara.run/public/35" />
      <div class="flex flex-col">
        <span class="text-sm font-semibold">B34roff</span>
        <span class="text-muted text-xs">Il y a 2 heures</span>
      </div>

      <UDropdownMenu
        :items="dropdownItems"
        :ui="{ content: 'w-48' }"
        class="absolute top-0 right-0"
      >
        <UButton
          class="rounded-full"
          color="neutral"
          icon="lucide:ellipsis-vertical"
          variant="ghost"
        />
      </UDropdownMenu>
    </div>

    <div class="w-full flex flex-col gap-1.5">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
