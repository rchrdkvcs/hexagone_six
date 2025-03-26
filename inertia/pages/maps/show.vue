<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, onMounted, ref } from 'vue'
import MapLeaflet from '~/components/MapLeaflet.vue'
import MapLayout from '~/layouts/MapLayout.vue'
import MarkerEditor from '~/components/MarkerEditor.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'
import { type Marker, use_markers } from '~/composables/use_markers'
import PenIcon from '~/components/Icones/PenIcon.vue'
import CloseIcon from '~/components/Icones/CloseIcon.vue'
import AttentionIcon from '~/components/Icones/AttentionIcon.vue'

defineOptions({
  layout: MapLayout,
})

const props = defineProps<{
  map: InferPageProps<MapsController, 'show'>['map'] & {
    markers: Marker[]
  }
}>()

const totalImages = ref(0)
const currentImageIndex = ref(1)
const imageUrl = computed(() => `/images/maps/${props.map.slug}/${currentImageIndex.value}.jpg`)
const imageWidth = ref(1600)
const imageHeight = ref(900)

// Edit mode state
const isEditMode = ref(false)

// Popup state
const showPopup = ref(false)
const tempMarkerPosition = ref<{ x: number; y: number } | null>(null)
const selectedMarker = ref<Marker | null>(null)

// Use markers composable with auto-save
const getCurrentStage = () => currentImageIndex.value
const { isLoading, saveSuccess, saveError, stageMarkers, addMarker, updateMarker, deleteMarker } =
  use_markers(props.map.markers, props.map.id, getCurrentStage, true) // Pass true for autoSave

// Handle map clicks
const handleMapClick = (coordinates: { x: number; y: number }) => {
  if (!isEditMode.value) return

  tempMarkerPosition.value = coordinates
  selectedMarker.value = null
  showPopup.value = true
}

// Handle edit marker
const handleEditMarker = (marker: Marker) => {
  if (!isEditMode.value) return

  selectedMarker.value = marker
  tempMarkerPosition.value = null
  showPopup.value = true
}

// Close popup and reset states
const closePopup = () => {
  showPopup.value = false
  tempMarkerPosition.value = null
  selectedMarker.value = null
}

// Toggle edit mode
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  if (!isEditMode.value) {
    closePopup()
  }
}

// Navigation between stages
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
    <div class="relative w-full h-full bg-black/50 backdrop-blur-xl">
      <MapLeaflet
        ref="map"
        :imageHeight="imageHeight"
        :imageUrl="imageUrl"
        :imageWidth="imageWidth"
        :is-edit-mode="isEditMode"
        :markers="stageMarkers"
        @map-click="handleMapClick"
        @edit-marker="handleEditMarker"
      />

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

      <!-- Loading indicator -->
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

      <!-- Success message -->
      <div
        v-if="saveSuccess"
        class="absolute top-32 right-8 z-100 px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
      >
        Changes saved
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
        class="absolute top-20 left-1/2 -translate-x-1/2 z-999 py-1 px-3 bg-red-600 rounded-full border border-white/25 color-white flex items-center gap-2"
      >
        <AttentionIcon class="w-5 h-5" />
        <span>Mode editeur activé</span>
      </div>

      <MarkerEditor
        :is-edit-mode="isEditMode"
        :selected-marker="selectedMarker"
        :show-popup="showPopup"
        :temp-marker-position="tempMarkerPosition"
        @add-marker="addMarker"
        @update-marker="updateMarker"
        @delete-marker="deleteMarker"
        @close-popup="closePopup"
      />
    </div>
  </MapLayout>
</template>
