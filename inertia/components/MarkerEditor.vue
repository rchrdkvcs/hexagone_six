<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Marker } from '~/composables/use_markers'

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

// Update marker name when selectedMarker changes
watch(
  () => props.selectedMarker,
  (newMarker) => {
    if (newMarker) {
      markerName.value = newMarker.label
    } else if (props.tempMarkerPosition) {
      markerName.value = 'New Marker'
    }
  },
  { immediate: true }
)

// Handle save
const saveMarker = () => {
  if (props.selectedMarker) {
    // Update existing marker
    emit('update-marker', props.selectedMarker, markerName.value)
  } else if (props.tempMarkerPosition) {
    // Create new marker
    emit('add-marker', props.tempMarkerPosition.x, props.tempMarkerPosition.y, markerName.value)
  }

  emit('close-popup')
}

// Handle delete
const handleDeleteMarker = () => {
  if (!props.selectedMarker) return

  if (confirm('Are you sure you want to delete this marker?')) {
    emit('delete-marker', props.selectedMarker.id)
    emit('close-popup')
  }
}

// Close popup
const closePopup = () => {
  emit('close-popup')
}
</script>

<template>
  <!-- Marker Popup -->
  <div v-if="showPopup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-999">
    <div class="bg-white rounded-lg p-6 w-80 shadow-xl">
      <h3 class="text-lg font-semibold mb-4">
        {{ selectedMarker ? 'Edit Marker' : 'New Marker' }}
      </h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="markerName">
          Marker Name
        </label>
        <input
          id="markerName"
          v-model="markerName"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="text"
          @keyup.enter="saveMarker"
        />
      </div>
      <div class="flex justify-between">
        <button
          v-if="selectedMarker"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          @click="handleDeleteMarker"
        >
          Delete
        </button>
        <div class="flex justify-end gap-2 ml-auto">
          <button
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            @click="closePopup"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            @click="saveMarker"
          >
            {{ selectedMarker ? 'Update' : 'Add' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
