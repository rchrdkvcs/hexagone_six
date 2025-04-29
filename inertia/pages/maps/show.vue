<script lang="ts" setup>
import { Head, usePage } from '@inertiajs/vue3'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import MapLeaflet from '~/components/maps/MapLeaflet.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import type MapsController from '../../../app/maps/controllers/maps_controller'
import { type Marker, use_markers } from '~/composables/use_markers'
import AppButton from '~/components/utils/AppButton.vue'
import VoteModal from '~/components/maps/VoteModal.vue'
import type User from '../../../app/users/models/user'
import MarkerModal from '~/components/maps/MarkerModal.vue'

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
const user = usePage().props.user as User
const showFooter = inject('showFooter') as Ref<boolean> | null

onMounted(() => {
  showFooter.value = false
})

onUnmounted(() => {
  showFooter.value = true
})

const { stageMarkers, addMarker, updateMarker, deleteMarker } = use_markers(
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

  <div
    class="fixed bottom-4 left-50% translate-x-[-50%] z-999 flex gap-2 backdrop-blur-md bg-primary-800/50 border border-white/5 rounded-full p-2 shadow-lg"
  >
    <AppButton
      v-for="index in totalImages"
      :key="index"
      :class="[
        index === currentImageIndex
          ? 'bg-white/15 color-white !rounded-full'
          : 'color-white/80 bg-transparent',
      ]"
      :label="`Etage ${index}`"
      class="!rounded-full"
      variant="ghost"
      @click="loadImage(index)"
    />

    <AppButton
      v-if="
        user &&
        (user.roles.includes('developer') ||
          user.roles.includes('admin') ||
          user.roles.includes('editor'))
      "
      :class="isEditMode ? 'bg-white/15 color-white' : 'color-white/80 bg-transparent'"
      class="!rounded-full"
      icon="i-mdi:pencil"
      variant="ghost"
      @click="toggleEditMode"
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

  <div class="relative bg-black/25 backdrop-blur-md overflow-hidden">
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
  </div>

  <VoteModal
    v-if="showViewModal"
    :key="viewModalMarker?.id"
    :map="map"
    :marker="viewModalMarker"
    @close="closeViewModal"
  />
</template>
