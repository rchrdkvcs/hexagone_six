<script lang="ts" setup>
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import type MarkerSuggest from '#models/marker_suggest'
import axios from 'axios'
import { computed, ref } from 'vue'

const props = defineProps<{
  suggestion: MarkerSuggest
  index: number
}>()

const emit = defineEmits(['suggestionUpdated'])
const localSuggestion = ref({ ...props.suggestion })
const isVoting = ref(false)
const voteError = ref<string | null>(null)

const voteRatio = computed(() => localSuggestion.value.upVote - localSuggestion.value.downVote)

const formatDate = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
    })
  } catch {
    return 'Date inconnue'
  }
}

const handleVote = async (voteType: 'up' | 'down') => {
  if (isVoting.value) return

  isVoting.value = true
  voteError.value = null

  const voteProperty = voteType === 'up' ? 'upVote' : 'downVote'
  const previousValue = localSuggestion.value[voteProperty]

  localSuggestion.value[voteProperty] += 1
  localSuggestion.value.voteRatio = localSuggestion.value.upVote - localSuggestion.value.downVote

  try {
    const response = await axios.patch(`/markers/suggestions/${localSuggestion.value.id}`, {
      [voteProperty]: localSuggestion.value[voteProperty],
    })
    emit('suggestionUpdated', response.data)
  } catch (error) {
    localSuggestion.value[voteProperty] = previousValue
    localSuggestion.value.voteRatio = localSuggestion.value.upVote - localSuggestion.value.downVote
    voteError.value =
      error.response.data.message || 'Une erreur est survenue lors de la mise à jour du vote.'
    console.error(`Error updating ${voteProperty}:`, error)
  } finally {
    isVoting.value = false
  }
}

const handleUpVote = () => handleVote('up')
const handleDownVote = () => handleVote('down')
</script>

<template>
  <div
    class="group w-full bg-white/5 border border-transparent rounded-xl p-2 transition-all duration-300 ease-in-out group"
  >
    <div class="flex items-center justify-between">
      <h3 class="font-medium text-white text-base flex items-center gap-2">
        <span>{{ localSuggestion.label }}</span>
        <span class="text-xs text-white/50 font-normal">
          ({{ formatDate(localSuggestion.createdAt.toString()) }})
        </span>
      </h3>

      <div class="grid grid-cols-3 gap-1 items-center">
        <button
          :class="{ 'opacity-50': isVoting }"
          :disabled="isVoting"
          class="flex items-center justify-center p-1 rounded-full color-white/50 hover:(bg-green-600/25 color-green-600) transition duration-300 ease-in-out cursor-pointer"
          @click="handleUpVote"
        >
          <i class="i-mdi:arrow-up size-6" />
        </button>
        <span
          :class="[
            voteRatio > 0 ? 'text-green-400' : voteRatio < 0 ? 'text-red-400' : 'text-white/70',
          ]"
          class="text-sm font-medium text-center"
        >
          {{ voteRatio }}
        </span>
        <button
          :class="{ 'opacity-50': isVoting }"
          :disabled="isVoting"
          class="flex items-center justify-center p-1 rounded-full color-white/50 hover:(bg-red-600/25 color-red-600) transition duration-300 ease-in-out cursor-pointer"
          @click="handleDownVote"
        >
          <i class="i-mdi:arrow-down size-6" />
        </button>
      </div>
    </div>

    <div v-if="voteError" class="text-red-400 text-xs mt-2">
      {{ voteError }}
    </div>
  </div>
</template>
