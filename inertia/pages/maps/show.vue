<script lang="ts" setup>
import { Head, router } from '@inertiajs/vue3'
import { computed, onMounted, ref } from 'vue'
import MapLeaflet from '~/components/MapLeaflet.vue'
import MapLayout from '~/layouts/MapLayout.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'

defineOptions({
  layout: MapLayout,
})

interface Marker {
  id: number | string
  label: string
  x: number
  y: number
  stage: number
  mapId?: string
}

// Update the prop type to include the markers array
const props = defineProps<{
  map: InferPageProps<MapsController, 'show'>['map'] & {
    markers: Marker[]
  }
}>()

const totalImages = ref(0)
const currentImageIndex = ref(1)
const isLoading = ref(false)
const saveSuccess = ref(false)
const saveError = ref<string | null>(null)

const imageUrl = computed(() => `/images/maps/${props.map.slug}/${currentImageIndex.value}.jpg`)

const imageWidth = ref(1600)
const imageHeight = ref(900)

// Convert to computed property to reactively update when currentImageIndex changes
const markers = computed(() =>
  props.map.markers.filter((marker: Marker) => marker.stage === currentImageIndex.value)
)

// Add edit mode and popup state
const isEditMode = ref(false)
const newMarkers = ref<Marker[]>([])
let nextMarkerId = -1 // Temporary IDs for new markers

// Popup state
const showPopup = ref(false)
const tempMarkerPosition = ref<{ x: number; y: number } | null>(null)
const markerName = ref('')

// Handle map clicks when in edit mode
const handleMapClick = (coordinates: { x: number; y: number }) => {
  if (!isEditMode.value) return

  // Store coordinates and show popup instead of creating marker immediately
  tempMarkerPosition.value = coordinates
  markerName.value = `Marker ${Math.abs(nextMarkerId)}`
  showPopup.value = true
}

// Function to create marker after name is confirmed
const createMarker = () => {
  if (!tempMarkerPosition.value) return

  const newMarker: Marker = {
    id: nextMarkerId--,
    x: tempMarkerPosition.value.x,
    y: tempMarkerPosition.value.y,
    label: markerName.value,
    stage: currentImageIndex.value,
  }

  newMarkers.value.push(newMarker)

  // Log the new marker data
  console.log('New marker added:', newMarker)
  console.log('All new markers:', newMarkers.value)

  // Reset popup state
  showPopup.value = false
  tempMarkerPosition.value = null
  markerName.value = ''
}

// Function to cancel marker creation
const cancelMarkerCreation = () => {
  showPopup.value = false
  tempMarkerPosition.value = null
  markerName.value = ''
}

// Combine existing and new markers for the current stage only
const displayedMarkers = computed(() => {
  const currentStageNewMarkers = newMarkers.value.filter(
    (marker) => marker.stage === currentImageIndex.value
  )
  return [...markers.value, ...currentStageNewMarkers]
})

// Function to save markers using Inertia
const saveMarkers = () => {
  isLoading.value = true
  saveError.value = null

  // Prepare the data to send (remove temporary IDs)
  const markersToSave = newMarkers.value.map((marker) => ({
    label: marker.label,
    x: marker.x,
    y: marker.y,
    stage: marker.stage,
    mapId: props.map.id,
  }))

  console.log('Markers to save:', markersToSave)

  router.post(
    '/markers',
    {
      markers: markersToSave,
    },
    {
      onSuccess: () => {
        // On success, clear new markers and exit edit mode
        newMarkers.value = []
        isEditMode.value = false
        isLoading.value = false
        saveSuccess.value = true

        // Hide success message after 3 seconds
        setTimeout(() => {
          saveSuccess.value = false
        }, 3000)

        // Reload markers from server
        router.reload({ only: ['map'] })
      },
      onError: (errors) => {
        isLoading.value = false
        saveError.value = 'Failed to save markers: ' + Object.values(errors).join(', ')
        console.error('Error saving markers:', errors)

        // Hide error message after 5 seconds
        setTimeout(() => {
          saveError.value = null
        }, 5000)
      },
    }
  )
}

// Function to cancel editing
const cancelEditing = () => {
  isEditMode.value = false
  newMarkers.value = []
  showPopup.value = false
  tempMarkerPosition.value = null
}

const loadImage = (index: number) => {
  if (index >= 1 && index <= totalImages.value) {
    currentImageIndex.value = index
  }
}

onMounted(() => {
  totalImages.value = props.map.stageCount ?? 0
})
</script>

<template>
  <Head :title="props.map.name" />

  <MapLayout
    :currentImageIndex="currentImageIndex"
    :totalImages="totalImages"
    @loadImage="loadImage"
  >
    <div class="relative w-full h-full bg-black/25 backdrop-blur-xl">
      <MapLeaflet
        ref="map"
        :imageHeight="imageHeight"
        :imageUrl="imageUrl"
        :imageWidth="imageWidth"
        :markers="displayedMarkers"
        @map-click="handleMapClick"
      />

      <div class="absolute top-20 right-8 z-100 flex gap-2">
        <button
          v-if="!isEditMode"
          class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
          @click="isEditMode = true"
        >
          Edit Markers
        </button>

        <template v-else>
          <button
            :disabled="isLoading"
            class="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
            @click="saveMarkers"
          >
            <span v-if="isLoading">Saving...</span>
            <span v-else>Save</span>
          </button>
          <button
            :disabled="isLoading"
            class="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
            @click="cancelEditing"
          >
            Cancel
          </button>
        </template>
      </div>

      <!-- Success message -->
      <div
        v-if="saveSuccess"
        class="absolute top-32 right-8 z-100 px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
      >
        Markers saved successfully!
      </div>

      <!-- Error message -->
      <div
        v-if="saveError"
        class="absolute top-32 right-8 z-100 px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
      >
        {{ saveError }}
      </div>

      <div
        v-if="isEditMode"
        class="absolute bottom-4 left-4 z-10 px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md"
      >
        Click on the map to add markers
      </div>

      <div
        v-if="showPopup"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
      >
        <div class="bg-white rounded-lg p-6 w-80 shadow-xl">
          <h3 class="text-lg font-semibold mb-4">New Marker</h3>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="markerName"
              >Marker Name</label
            >
            <input
              id="markerName"
              v-model="markerName"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="text"
              @keyup.enter="createMarker"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              @click="cancelMarkerCreation"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              @click="createMarker"
            >
              Add Marker
            </button>
          </div>
        </div>
      </div>
    </div>
  </MapLayout>
</template>
