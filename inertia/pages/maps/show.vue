<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import MapLeaflet from '~/components/maps/MapLeaflet.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import type MapsController from '../../../app/maps/controllers/maps_controller'
import { type Marker, useMarkers } from '~/composables/use_markers'
import MarkerModal from '~/components/maps/MarkerModal.vue'
import MapSlideover from '~/components/maps/MapSlideover.vue'
import { useAccess } from '~/composables/use_access'
import Maps from '~/layouts/maps.vue'

defineOptions({
  layout: Maps,
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
const toast = useToast()
const overlay = useOverlay()
const slideover = overlay.create(MapSlideover)
const showLabel = ref(true)

const { stageMarkers, addMarker, updateMarker, deleteMarker } = useMarkers(
  props.map.markers,
  props.map.id,
  () => currentImageIndex.value,
  true
)

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
    slideover.open({ marker })
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

const toggleEditMode = () => {
  if (isEditMode.value === false) {
    toast.add({
      title: 'Mode édition activé',
      description: 'Vous pouvez maintenant ajouter, modifier ou supprimer des marqueurs.',
      icon: 'lucide:shield',
    })
  } else if (isEditMode.value === true) {
    toast.add({
      title: 'Mode édition désactivé',
      description: 'Vous ne pouvez plus ajouter, modifier ou supprimer des marqueurs.',
      icon: 'lucide:shield',
    })
  }

  isEditMode.value = !isEditMode.value
  if (!isEditMode.value) closePopup()
}

const loadImage = (index: number) => {
  if (index >= 1 && index <= totalImages.value) {
    currentImageIndex.value = index
  }
}

const handleLabelView = () => {
  showLabel.value = !showLabel.value
  toast.add({
    title: showLabel.value
      ? 'Affichage des étiquettes activé'
      : 'Affichage des étiquettes désactivé',
    icon: 'lucide:eye',
  })
}
</script>

<template>
  <Head :title="props.map.name" />

  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-999 flex gap-2 bg-default/75 backdrop-blur border border-default rounded-full p-2 shadow-lg"
  >
    <UButton
      v-for="index in totalImages"
      :key="index"
      :label="`Etage ${index}`"
      :active="index === currentImageIndex"
      activeColor="primary"
      activeVariant="solid"
      variant="ghost"
      class="rounded-full cursor-pointer font-semibold transition-all duration-200 ease-in-out"
      color="neutral"
      @click="loadImage(index)"
      size="lg"
    />

    <UButton
      :active="showLabel"
      :icon="showLabel ? 'lucide:eye-off' : 'lucide:eye'"
      class="rounded-full cursor-pointer"
      size="lg"
      variant="ghost"
      @click="handleLabelView"
    />

    <UButton
      v-if="useAccess() >= 2"
      :active="isEditMode"
      activeColor="primary"
      variant="ghost"
      @click="toggleEditMode"
      activeVariant="solid"
      class="rounded-full cursor-pointer"
      icon="lucide:pencil"
      size="lg"
    />
  </div>

  <MarkerModal
    :is-edit-mode="isEditMode"
    :selected-marker="selectedMarker"
    :show-popup="showPopup"
    :temp-marker-position="tempMarkerPosition"
    @close="closePopup"
    @close-popup="closePopup"
    @add-marker="addMarker"
    @update-marker="updateMarker"
    @delete-marker="deleteMarker"
  />

  <div class="fixed top-0 left-0 size-full overflow-hidden">
    <MapLeaflet
      ref="map"
      :imageHeight="imageHeight"
      :imageUrl="imageUrl"
      :imageWidth="imageWidth"
      :is-edit-mode="isEditMode"
      :markers="stageMarkers"
      :voteModal="showViewModal"
      :showLabel="showLabel"
      @map-click="handleMapClick"
      @edit-marker="handleEditMarker"
      @marker-click="handleMarkerClick"
    />
  </div>
</template>
