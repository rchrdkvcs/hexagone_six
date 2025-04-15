<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['close', 'add-suggestion'])

const newSuggestionText = ref('')
const suggestionInputRef = ref<HTMLInputElement | null>(null)

const saveSuggestion = () => {
  if (!newSuggestionText.value.trim()) return
  emit('add-suggestion', newSuggestionText.value)
  newSuggestionText.value = ''
  emit('close')
}

// Handle escape key to close popup
const handleKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  nextTick(() => suggestionInputRef.value?.focus())
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-999 bg-black/25 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-primary-800/50 backdrop-blur-lg rounded-full w-1/2 xl:w-1/3 border border-white/15 shadow-lg color-white flex items-center justify-center gap-2 px-3"
    >
      <i class="i-mdi:add min-size-6 size-6" />
      <input
        ref="suggestionInputRef"
        v-model="newSuggestionText"
        class="w-full h-full bg-transparent ring-none focus:ring-0 focus:outline-none text-lg py-3 !outline-none"
        placeholder="Votre suggestion..."
        type="text"
        @keyup.enter="saveSuggestion"
      />

      <button
        class="text-white/75 rounded-full px-3 py-0.5 border border-transparent hover:(bg-white/5 color-white/100 border-white/15) transition duration-300 ease-in-out cursor-pointer"
        @click="saveSuggestion"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>

<style scoped>
:focus-visible {
  outline: none;
}
</style>
