<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import type { Marker } from '~/composables/use_markers'
import TextIcon from '~/components/Icones/TextIcon.vue'

const props = defineProps<{
  isEditMode: boolean
  showPopup: boolean
  selectedMarker: Marker | null
  tempMarkerPosition: { x: number; y: number } | null
}>()

const emit = defineEmits<{
  'add-marker': [x: number, y: number, label: string]
  'update-marker': [marker: Marker, newLabel: string]
  'delete-marker': [markerId: number | string]
  'close-popup': []
}>()

const markerName = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.selectedMarker,
  (newMarker) => {
    markerName.value = newMarker ? newMarker.label : props.tempMarkerPosition ? 'New Marker' : ''
  },
  { immediate: true }
)

watch(
  () => props.showPopup,
  (isVisible) => {
    if (!isVisible) {
      markerName.value = ''
    } else {
      nextTick(() => inputRef.value?.focus())
    }
  }
)

const saveMarker = () => {
  if (props.selectedMarker) {
    emit('update-marker', props.selectedMarker, markerName.value)
  } else if (props.tempMarkerPosition) {
    emit('add-marker', props.tempMarkerPosition.x, props.tempMarkerPosition.y, markerName.value)
  }
  emit('close-popup')
}

const handleDeleteMarker = () => {
  if (props.selectedMarker) {
    emit('delete-marker', props.selectedMarker.id)
    emit('close-popup')
  }
}

addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    emit('close-popup')
  }
})
</script>

<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center z-999 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-#24262A/50 backdrop-blur-lg rounded-xl w-1/2 xl:w-1/3 border border-white/15 shadow-lg color-white flex items-center justify-center gap-4 px-4"
    >
      <TextIcon class="w-5 min-w-5 h-5" />
      <input
        ref="inputRef"
        v-model="markerName"
        class="w-full h-full bg-transparent ring-none focus:ring-0 focus:outline-none text-lg py-3"
        placeholder="Ajouter un marqueur"
        type="text"
        @keyup.enter="saveMarker"
      />

      <button
        v-if="selectedMarker"
        class="text-white/75 rounded-full px-3 py-0.5 border border-transparent hover:(color-red-6 bg-white/5 border-white/15) transition-all duration-300 ease-in-out"
        @click="handleDeleteMarker"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>
