<script lang="ts" setup>
import { capitalize, computed, ref } from 'vue'
import { useDateFormat } from '@vueuse/shared'
import { useUser } from '~/composables/use_user'
import UserPost from '~/components/users/UserPost.vue'
import EditModal from '~/components/users/EditModal.vue'

import type { DropdownMenuItem, TabsItem } from '@nuxt/ui'
import type User from '#users/models/user'

const props = defineProps<{
  userProfile: User
}>()

const actualUser = useUser()
const overlay = useOverlay()
const editModal = overlay.create(EditModal)

const feedData = computed(() => props.userProfile.posts)
const propositionsData = computed(() =>
  props.userProfile.posts.filter((p) => p.category === 'proposition')
)
const suggestionData = computed(() =>
  props.userProfile.posts.filter((p) => p.category === 'suggestion')
)

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
          <UAvatar
            :alt="capitalize(userProfile.userName)"
            :src="userProfile.avatarUrl"
            class="size-16 ring-2 ring-muted"
            size="3xl"
          />
          <div class="flex flex-col gap-1">
            <div class="flex gap-2 items-center">
              <h1 class="text-xl font-bold capitalize">{{ userProfile.userName }}</h1>
              <UButton
                v-if="actualUser?.id === userProfile.id"
                class="w-fit rounded-full"
                color="neutral"
                icon="lucide:edit-2"
                size="sm"
                variant="soft"
                @click="editModal.open({ user: userProfile })"
              />
            </div>
            <span class="text-muted text-xs">
              Membres depuis le
              {{ useDateFormat(userProfile.createdAt as unknown as Date, 'DD/MM/YYYY') }}
            </span>
          </div>

          <UDropdownMenu
            v-if="actualUser?.id !== userProfile.id"
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
        <p class="text-muted text-sm">
          {{ userProfile.bio || "Cet utilisateur n'a pas encore écrit de bio." }}
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
            <UserPost
              v-for="post in feedData"
              :key="post.id"
              :avatarUrl="userProfile.avatarUrl"
              :post="post"
              :userName="userProfile.userName"
            />
          </div>
        </template>

        <template #propositions>
          <div class="p-4 size-full flex flex-col gap-4">
            <UserPost
              v-for="post in propositionsData"
              :key="post.id"
              :avatarUrl="userProfile.avatarUrl"
              :post="post"
              :userName="userProfile.userName"
            />
          </div>
        </template>

        <template #suggestions>
          <div class="p-4 size-full flex flex-col gap-4">
            <UserPost
              v-for="post in suggestionData"
              :key="post.id"
              :avatarUrl="userProfile.avatarUrl"
              :post="post"
              :userName="userProfile.userName"
            />
          </div>
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>
