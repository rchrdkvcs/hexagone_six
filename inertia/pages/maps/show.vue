<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import MapLeaflet from '~/components/maps/MapLeaflet.vue'
import MapLayout from '~/layouts/MapLayout.vue'
import MarkerEditor from '~/components/maps/MarkerEditor.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'
import { type Marker, use_markers } from '~/composables/use_markers'
import VoteModal from '~/components/maps/VoteModal.vue'
import MapEditUi from '~/components/maps/MapEditUi.vue'

defineOptions({
  layout: MapLayout,
})

const props = defineProps<{
  map: InferPageProps<MapsController, 'show'>['map']
}>()

const totalImages = ref(props.map.stageCount ?? 0)
const currentImageIndex = ref(1)
const imageUrl = computed(() => `/images/maps/${props.map.slug}/${currentImageIndex.value}.jpg`)
const imageWidth = ref(1600)
const imageHeight = ref(900)

const isEditMode = ref(false)
const showPopup = ref(false)
const tempMarkerPosition = ref<{ x: number; y: number } | null>(null)
const selectedMarker = ref<Marker | null>(null)
const viewModalMarker = ref<Marker | null>(null)
const showViewModal = ref(false)

const { isLoading, saveSuccess, saveError, stageMarkers, addMarker, updateMarker, deleteMarker } =
  use_markers(props.map.markers, props.map.id, () => currentImageIndex.value, true)

const handleMapClick = (position: { x: number; y: number }) => {
  if (!isEditMode.value) return

  tempMarkerPosition.value = position
  selectedMarker.value = null
  showPopup.value = true
}

const handleMarkerClick = (marker: Marker) => {
  if (isEditMode.value) {
    selectedMarker.value = marker
    tempMarkerPosition.value = null
    showPopup.value = true
  } else {
    viewModalMarker.value = marker
    showViewModal.value = true
  }
}

const handleEditMarker = (marker: Marker) => {
  if (!isEditMode.value) return

  selectedMarker.value = marker
  tempMarkerPosition.value = null
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
  tempMarkerPosition.value = null
  selectedMarker.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  viewModalMarker.value = null
}

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  if (!isEditMode.value) closePopup()
}

const loadImage = (index: number) => {
  if (index >= 1 && index <= totalImages.value) {
    currentImageIndex.value = index
  }
}
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
        :voteModal="showViewModal"
        @map-click="handleMapClick"
        @edit-marker="handleEditMarker"
        @marker-click="handleMarkerClick"
      />

      <VoteModal
        v-if="showViewModal"
        :key="viewModalMarker?.id"
        :map="map"
        :marker="viewModalMarker"
        @close="closeViewModal"
      />

      <MapEditUi
        :is-edit-mode="isEditMode"
        :is-loading="isLoading"
        :save-error="saveError"
        :save-success="saveSuccess"
        @toggle-edit-mode="toggleEditMode"
      />

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
