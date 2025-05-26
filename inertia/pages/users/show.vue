<script lang="ts" setup>
import { InferPageProps } from '@adonisjs/inertia/types'
import { ref } from 'vue'
import UserPost from '~/components/users/UserPost.vue'

import type ShowUserController from '#users/controllers/show_user_controller'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { TabsItem } from '@nuxt/ui'

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

const tabsItems = ref<TabsItem[]>([
  {
    label: 'Feed',
    slot: 'feed' as const,
  },
  {
    label: 'Propositions',
    slot: 'propositions' as const,
  },
  {
    label: 'Suggestions',
    slot: 'suggestions' as const,
  },
])
</script>

<template>
  <UContainer class="grid grid-cols-[320px_680px] gap-8 py-8 w-fit">
    <UCard class="shadow-lg sticky top-24 h-fit">
      <template #header>
        <div class="flex items-center gap-4 relative">
          <UAvatar class="w-16 h-16" src="https://avatar.iran.liara.run/public/35" />
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold capitalize">{{ user.userName }}</h1>
            <span class="text-muted text-sm">Membre depuis tah l'époque</span>
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
            <span class="text-xl font-semibold">127</span>
            <span class="text-muted text-sm">Followers</span>
          </p>
          <p class="flex flex-col items-center">
            <span class="text-xl font-semibold">36</span>
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

    <div class="flex flex-col bg-default ring ring-default rounded-md w-full h-fit">
      <UTabs
        color="neutral"
        variant="link"
        :items="tabsItems"
        class="w-full"
        :ui="{
          trigger: 'cursor-pointer',
          list: 'p-2',
        }"
      >
        <template #feed>
          <div class="p-4 size-full flex flex-col gap-4">
            <UserPost v-for="post in user.posts" :key="post.id">
              <p>{{ post.content }}</p>
            </UserPost>
          </div>
        </template>

        <template #propositions>
          <div class="p-4 size-full flex flex-col gap-4">
            <UserPost v-for="post in user.posts" :key="post.id">
              <p>{{ post.content }}</p>
            </UserPost>
          </div>
        </template>

        <template #suggestions>
          <div class="p-4 size-full flex flex-col gap-4">
            <div class="flex flex-col items-center justify-center py-16 text-center">
              <UIcon name="lucide:lightbulb" class="mb-4 size-16 animate-pulse opacity-75" />
              <h3 class="text-xl font-medium text-default mb-2">Aucune suggestion</h3>
              <p class="text-muted max-w-md mb-6">
                {{ user.userName }} n'a pas encore fait de suggestions
              </p>
            </div>
          </div>
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>
