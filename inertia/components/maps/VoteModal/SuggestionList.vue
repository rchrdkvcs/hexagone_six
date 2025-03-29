<script lang="ts" setup>
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'
import SuggestionItem from '~/components/maps/VoteModal/SuggestionItem.vue'

type Marker = InferPageProps<MapsController, 'show'>['map']['markers']
type Suggestion = Marker['suggestions'][number]

defineProps<{
  title: string
  suggestions: Suggestion[]
  total?: number
  class?: string
  'title-class'?: string
}>()

const emit = defineEmits(['suggestion-updated'])

const handleSuggestionUpdate = (suggestion: Suggestion) => {
  emit('suggestion-updated', suggestion)
}
</script>

<template>
  <div class="flex flex-col gap-3" :class="class">
    <h2 class="text-white/75 text-lg font-medium flex items-center gap-2" :class="titleClass">
      <span class="h-1.5 w-1.5 rounded-full bg-white/50"></span>
      <span>
        {{ title }}
        <span v-if="total" class="text-white/50">({{ total }})</span>
      </span>
    </h2>

    <TransitionGroup
      :class="{ 'max-h-50vh overflow-y-auto rounded-xl': suggestions.length > 5 }"
      class="w-full flex flex-col gap-2"
      name="suggestion-list"
      tag="div"
    >
      <SuggestionItem
        v-for="(suggestion, index) in suggestions"
        :key="suggestion.id"
        :index="index"
        :suggestion="suggestion"
        @suggestion-updated="handleSuggestionUpdate"
      />
    </TransitionGroup>
  </div>
</template>
