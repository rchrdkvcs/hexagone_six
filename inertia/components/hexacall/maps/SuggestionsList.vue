<script lang="ts" setup>
import type Suggestion from '#suggestions/models/suggestion'
import { ref } from 'vue'

const props = defineProps<{
  suggestions: Suggestion[]
  userId?: string
  localVotes: { suggestionId: string; voteType: string }[]
}>()

// Utiliser les localVotes passés en prop au lieu d'un état local

const emit = defineEmits<{
  (e: 'vote', suggestion: Suggestion, voteType: 'up' | 'down'): void
}>()

function voteOnSuggestion(suggestion: Suggestion, voteType: 'up' | 'down') {
  emit('vote', suggestion, voteType)
}

function hasVoted(suggestion: Suggestion, voteType: 'up' | 'down'): boolean {
  const voteTypeValue = voteType === 'up' ? 'upVote' : 'downVote'

  const localVote = props.localVotes.some(
    (vote) => vote.suggestionId === suggestion.id && vote.voteType === voteTypeValue
  )
  
  const serverVote = (suggestion as any).userVotes?.some((vote: any) => vote.voteType === voteTypeValue)

  return localVote || serverVote || false
}
</script>

<template>
  <div class="flex flex-col gap-2 size-full py-4">
    <UCard
      v-for="(suggestion, index) in suggestions"
      :key="suggestion.id"
      :index="index"
      :suggestion="suggestion"
      :ui="{ body: '!py-2 !px-3' }"
      :class="{ 'bg-warning/35 ring-warning/50 backdrop-blur-3xl': index === 0 }"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-medium text-base flex flex-col gap-1">
          <span>{{ suggestion.label }}</span>
          <span :class="index === 0 ? 'text-elevated' : 'text-muted'" class="text-sm font-normal">
            Proposée par :
            <ULink
              :class="index === 0 ? 'text-elevated' : 'text-muted'"
              :to="`/membres/${suggestion.user.userSlug}`"
              class="underline"
              >{{ suggestion.user.userName }}</ULink
            >
          </span>
        </h3>

        <div class="w-32 flex items-center justify-center p-1.5">
          <UButton
            @click="voteOnSuggestion(suggestion, 'up')"
            :active="hasVoted(suggestion, 'up')"
            :disabled="hasVoted(suggestion, 'up')"
            icon="lucide:arrow-up"
            variant="ghost"
            color="neutral"
            activeVariant="subtle"
            activeColor="success"
          />
          <span class="text-lg font-medium w-full text-center">{{ suggestion.voteRatio }}</span>
          <UButton
            @click="voteOnSuggestion(suggestion, 'down')"
            :active="hasVoted(suggestion, 'down')"
            :disabled="hasVoted(suggestion, 'down')"
            icon="lucide:arrow-down"
            variant="ghost"
            color="neutral"
            activeVariant="subtle"
            activeColor="error"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
