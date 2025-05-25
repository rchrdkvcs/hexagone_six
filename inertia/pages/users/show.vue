<script lang="ts" setup>
import { InferPageProps } from '@adonisjs/inertia/types'
import { ref } from 'vue'

import type ShowUserController from '#users/controllers/show_user_controller'
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  user: InferPageProps<ShowUserController, 'render'>
}>()

const dropdownItems = ref<DropdownMenuItem[]>([
  {
    label: 'Signaler',
    icon: 'lucide:flag',
  },
  {
    label: 'Bloquer',
    icon: 'lucide:ban',
  },
  {
    label: 'Partager',
    icon: 'lucide:share-2',
  },
])
</script>

<template>
  <UContainer class="grid grid-cols-[320px_1fr] gap-8 py-16">
    <UCard class="shadow-lg">
      <template #header>
        <div class="flex items-center gap-4 relative">
          <UAvatar class="w-16 h-16" src="https://avatar.iran.liara.run/public/35" />
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold capitalize">{{ user.userName }}</h1>
            <span class="text-muted text-sm">Membre depuis tah l'epoque</span>
          </div>

          <UDropdownMenu
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 8,
            }"
            :items="dropdownItems"
            :ui="{
              content: 'w-48',
            }"
            class="absolute -top-2 -right-4"
          >
            <UButton
              class="rounded-full"
              color="neutral"
              icon="lucide:ellipsis-vertical"
              variant="ghost"
            />
          </UDropdownMenu>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 bg-muted rounded-md py-1 divide-x divide-accented">
          <p class="flex flex-col items-center">
            <span class="text-xl font-semibold">0</span>
            <span class="text-muted text-sm">Followers</span>
          </p>
          <p class="flex flex-col items-center">
            <span class="text-xl font-semibold">0</span>
            <span class="text-muted text-sm">Following</span>
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <UButton class="w-fit rounded-full" color="neutral" icon="lucide:plus" label="Suivre" />
          <UButton
            class="w-fit rounded-full"
            color="neutral"
            icon="lucide:edit-2"
            label="Modifier"
            variant="soft"
          />
        </div>

        <p class="text-muted text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        </p>
      </div>
    </UCard>
  </UContainer>
</template>
