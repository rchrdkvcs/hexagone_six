<script lang="ts" setup>
import PenIcon from '~/components/Icones/PenIcon.vue'
import CloseIcon from '~/components/Icones/CloseIcon.vue'
import AttentionIcon from '~/components/Icones/AttentionIcon.vue'

defineProps<{
  isEditMode: boolean
  isLoading: boolean
  saveSuccess: boolean
  saveError: string | null
}>()

const emit = defineEmits(['toggle-edit-mode'])

const toggleEditMode = () => emit('toggle-edit-mode')
</script>

<template>
  <div>
    <div class="fixed top-4 right-4 z-999 flex gap-2">
      <button
        v-if="isEditMode"
        class="py-2 px-3 bg-#24262A/50 backdrop-blur-lg border border-white/15 rounded-xl flex items-center gap-2 hover:bg-red-600 transition-colors duration-300 ease-in-out color-white/80 hover:color-white"
        @click="toggleEditMode"
      >
        <CloseIcon class="w-6 h-6" />
        <span>Quitter le mode editeur</span>
      </button>

      <button
        v-else
        class="py-2 px-3 bg-#24262A/50 backdrop-blur-lg border border-white/15 rounded-xl flex items-center gap-2 hover:bg-white transition-colors duration-300 ease-in-out color-white/80 hover:color-black"
        @click="toggleEditMode"
      >
        <PenIcon class="w-6 h-6" />
        <span>Mode editeur</span>
      </button>
    </div>

    <div
      v-if="isLoading"
      class="absolute top-32 right-8 z-100 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md flex items-center gap-2"
    >
      <svg
        class="animate-spin h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        ></path>
      </svg>
      Saving...
    </div>

    <div
      v-if="saveSuccess"
      class="absolute top-32 right-8 z-100 px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
    >
      Changes saved
    </div>

    <div
      v-if="saveError"
      class="absolute top-32 right-8 z-100 px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
    >
      {{ saveError }}
    </div>

    <div
      v-if="isEditMode"
      class="absolute top-20 left-1/2 -translate-x-1/2 z-999 py-1 px-3 bg-red-600 rounded-full border border-white/25 color-white flex items-center gap-2"
    >
      <AttentionIcon class="w-5 h-5" />
      <span>Mode editeur activé</span>
    </div>
  </div>
</template>
