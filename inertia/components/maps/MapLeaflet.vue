<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { LImageOverlay, LMap, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface Marker {
  id: number | string
  x: number
  y: number
  label: string
  stage: number
}

const props = defineProps<{
  imageUrl: string
  imageWidth: number
  imageHeight: number
  markers: Marker[]
  isEditMode: boolean
  voteModal: boolean
}>()

const emit = defineEmits(['map-click', 'edit-marker', 'marker-click'])
const selectedMarkerId = ref<number | string | null>(null)
const map = ref(null)
const crs = L.CRS.Simple
const bounds = ref([
  [0, 0],
  [props.imageHeight, props.imageWidth],
])
const center = ref([props.imageHeight, props.imageWidth])
const zoom = ref(0)
const minZoom = ref(-0.5)
const maxZoom = ref(4)
const mapOptions = ref({
  attributionControl: false,
  zoomControl: false,
  wheelPxPerZoomLevel: 150,
  zoomDelta: 0.1,
  smoothWheelZoom: true,
  smoothSensitivity: 1.5,
  scrollWheelZoom: true,
  wheelDebounceTime: 40,
  zoomSnap: 0.1,
})

const toCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const getMarkerIcon = (marker: Marker) => {
  const isSelected = props.voteModal && marker.id === selectedMarkerId.value
  const modalClass = isSelected ? 'modal-open' : ''
  return L.divIcon({
    html: `<div class="marker-text ${modalClass}">${toCapitalize(marker.label || marker.id.toString())}</div>`,
    className: 'text-marker-icon',
    iconSize: undefined,
    iconAnchor: [0, 0],
  })
}

const onMapReady = (mapInstance: any) => mapInstance.fitBounds(bounds.value)

const handleMapClick = (event: L.LeafletMouseEvent) =>
  emit('map-click', { x: event.latlng.lng, y: event.latlng.lat })

const handleMarkerClick = (marker: Marker) => {
  selectedMarkerId.value = marker.id
  emit(props.isEditMode ? 'edit-marker' : 'marker-click', marker)
}

watch(
  () => props.voteModal,
  (newValue) => {
    if (!newValue) selectedMarkerId.value = null
  }
)

onMounted(() => {
  const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href
  const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href
  const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href

  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })
})
</script>

<template>
  <div class="image-map-container">
    <l-map
      ref="map"
      :bounds="bounds"
      :center="center"
      :crs="crs"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
      :options="mapOptions"
      :zoom="zoom"
      @click="handleMapClick"
      @ready="onMapReady"
    >
      <l-image-overlay :bounds="bounds" :url="imageUrl" />
      <l-marker
        v-for="marker in markers"
        :key="`${marker.id}-${voteModal}-${selectedMarkerId}`"
        :icon="getMarkerIcon(marker) as unknown as L.Icon"
        :lat-lng="[marker.y, marker.x]"
        @click="handleMarkerClick(marker)"
      />
    </l-map>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@reference "@nuxt/ui";

.image-map-container {
  @apply size-full bg-transparent;
}

:deep(.leaflet-container),
:deep(.leaflet-pane),
:deep(.leaflet-map-pane canvas),
:deep(.leaflet-tile-pane),
:deep(.leaflet-overlay-pane) {
  @apply bg-transparent;
}

:deep(.text-marker-icon) {
  @apply bg-transparent border-none relative left-0 top-0;
}

:deep(.leaflet-image-layer) {
  @apply border border-default rounded-lg;
}

:deep(.marker-text) {
  @apply font-medium text-base text-white whitespace-nowrap absolute text-center cursor-pointer transition-all duration-300 z-10 -translate-1/2;
  @apply bg-default/75 backdrop-blur rounded-full px-3 py-1;
}

:deep(.marker-text:hover),
:deep(.marker-text.modal-open) {
  @apply bg-primary text-slate-900 font-semibold z-[1000] shadow-xl;
}

:deep(.leaflet-marker-pane .leaflet-marker-icon:hover) {
  @apply z-50;
}
</style>
