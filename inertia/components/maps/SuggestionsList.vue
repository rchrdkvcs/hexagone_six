<script lang="ts" setup>
import type Suggestion from '#suggestions/models/suggestion'

defineProps<{
  suggestions: Suggestion[]
}>()

defineEmits<{
  (e: 'vote', suggestion: Suggestion, voteType: 'up' | 'down'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 size-full py-4">
    <UCard
      v-for="(suggestion, index) in suggestions"
      :key="suggestion.id"
      :index="index"
      :suggestion="suggestion"
      :ui="{
        body: '!py-2 !px-3',
      }"
      :class="{ 'bg-warning/50 ring-warning/75': index === 0 }"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-medium text-base flex flex-col gap-1">
          <span>{{ suggestion.label }}</span>
          <span :class="index === 0 ? 'text-elevated' : 'text-muted'" class="text-sm font-normal">
            Proposée par :
            <ULink
              :class="index === 0 ? 'text-elevated' : 'text-muted'"
              :to="`/${suggestion.user.userName}`"
              class="underline"
              >{{ suggestion.user.userName }}</ULink
            >
          </span>
        </h3>

        <div class="w-32 flex items-center justify-center p-1.5">
          <UButton
            class="cursor-pointer hover:bg-error"
            color="neutral"
            icon="lucide:arrow-down"
            variant="soft"
            @click="$emit('vote', suggestion, 'down')"
          />
          <span class="text-base font-medium w-full text-center">
            {{ suggestion.voteRatio }}
          </span>
          <UButton
            class="cursor-pointer hover:bg-success"
            color="neutral"
            icon="lucide:arrow-up"
            variant="soft"
            @click="$emit('vote', suggestion, 'up')"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
