<script lang="ts" setup>
import { onMounted, ref } from 'vue'
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

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  imageWidth: {
    type: Number,
    required: true,
  },
  imageHeight: {
    type: Number,
    required: true,
  },
  markers: {
    type: Array as () => Marker[],
    default: () => [],
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['map-click', 'edit-marker'])

const map = ref(null)
const crs = L.CRS.Simple
const bounds = ref<L.LatLngBoundsExpression>([
  [0, 0],
  [props.imageHeight, props.imageWidth],
])
const center = ref<[number, number]>([props.imageHeight / 1, props.imageWidth / 1])
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

const createTextIcon = (text: string): L.DivIcon => {
  return L.divIcon({
    html: `<div class="marker-text">${text}</div>`,
    className: 'text-marker-icon',
    iconSize: undefined,
    iconAnchor: [0, 0],
  })
}

const getMarkerIcon = (marker: Marker): L.DivIcon => {
  return createTextIcon(marker.label || marker.id.toString())
}

const onMapReady = (mapInstance: any) => {
  mapInstance.fitBounds(bounds.value)
}

const handleMapClick = (event: L.LeafletMouseEvent) => {
  emit('map-click', { x: event.latlng.lng, y: event.latlng.lat })
}

const handleMarkerClick = (marker: Marker) => {
  if (props.isEditMode) {
    emit('edit-marker', marker)
  }
}

onMounted(() => {
  const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href
  const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href
  const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href

  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  })
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
        :key="marker.id"
        :icon="getMarkerIcon(marker) as unknown as L.Icon"
        :lat-lng="[marker.y, marker.x]"
        @click="() => handleMarkerClick(marker)"
      />
    </l-map>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

.image-map-container {
  width: 100%;
  height: 100vh;
  background: transparent;
}

:deep(.leaflet-container) {
  background: transparent;
}

:deep(.leaflet-pane) {
  background: transparent;
}

:deep(.leaflet-map-pane canvas) {
  background: transparent;
}

:deep(.leaflet-tile-pane) {
  background: transparent;
}

:deep(.leaflet-overlay-pane) {
  background: transparent;
}

:deep(.text-marker-icon) {
  background: transparent;
  border: none;
  position: relative;
  left: 0;
  top: 0;
}

:deep(.marker-text) {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: white;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  white-space: nowrap;
  cursor: grab;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  background: #00000050;
  padding: 0.25rem 0.5rem;
}
</style>
