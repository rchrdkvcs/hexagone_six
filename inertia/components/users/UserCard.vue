<script setup lang="ts">
import { capitalize, ref } from 'vue'
import { useDateFormat } from '@vueuse/shared'
import { useUser } from '~/composables/use_user'
import EditModal from '~/components/users/EditModal.vue'

import type { DropdownMenuItem } from '@nuxt/ui'
import type User from '#users/models/user'

defineProps<{
  userProfile: User
}>()

const actualUser = useUser()
const overlay = useOverlay()
const editModal = overlay.create(EditModal)

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
  <UCard class="shadow-lg md:sticky top-24 h-fit">
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
</template>
