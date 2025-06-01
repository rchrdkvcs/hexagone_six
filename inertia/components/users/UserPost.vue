<script setup lang="ts">
import { useTimeAgo } from '~/composables/use_time_ago'

import type Post from '#users/models/post'

const props = defineProps<{ userName: string; avatarUrl: string; post: Post }>()

const { formattedTime } = useTimeAgo(props.post.createdAt)
</script>

<template>
  <div class="flex flex-col gap-2 p-2 rounded-md hover:bg-muted group">
    <div class="flex items-center gap-2 relative">
      <UAvatar :src="avatarUrl" class="w-8 h-8" />
      <div class="flex flex-col">
        <span class="text-sm font-semibold">
          {{ userName }}
        </span>
        <span class="text-muted text-xs">{{ formattedTime }}</span>
      </div>
    </div>

    <div class="w-full flex flex-col gap-1.5">
      <p class="text-sm md:text-base" v-html="post.content" />
    </div>
  </div>
</template>
