<script lang="ts" setup>
import { computed, ref } from 'vue'
import UserPost from '~/components/users/UserPost.vue'
import UserCard from '~/components/users/UserCard.vue'

import type { TabsItem } from '@nuxt/ui'
import type User from '#users/models/user'
import EmptyFeed from '~/components/users/EmptyFeed.vue'

const props = defineProps<{
  userProfile: User
}>()

const feedData = computed(() => props.userProfile.posts)

const propositionsData = computed(() =>
  props.userProfile.posts.filter((p) => p.category === 'proposition')
)

const suggestionData = computed(() =>
  props.userProfile.posts.filter((p) => p.category === 'suggestion')
)

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
    <UserCard :userProfile="userProfile" />

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
            <EmptyFeed
              v-if="feedData.length === 0"
              icon="lucide:inbox"
              title="Aucune publication pour le moment"
              description="Les publications apparaîtront ici dès que du contenu sera ajouté."
            />

            <UserPost
              v-else
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
            <EmptyFeed
              v-if="propositionsData.length === 0"
              icon="lucide:lightbulb"
              title="Aucune proposition publiée"
              description="Cet utilisateur n'a pas encore partagé de propositions."
            />

            <UserPost
              v-else
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
            <EmptyFeed
              v-if="suggestionData.length === 0"
              icon="lucide:message-circle"
              title="Aucune suggestion disponible"
              description="Cet utilisateur n'a pas encore partagé de suggestions."
            />

            <UserPost
              v-else
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
