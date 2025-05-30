<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapSlideover from '~/components/maps/MapSlideover.vue'

import type Marker from '#markers/models/marker'

const props = defineProps<{
  imageUrl: string
  markers: Marker[]
  showLabel: boolean
  polygonesPreview: { coordinates: { x: number; y: number }[] } | null
}>()

const emits = defineEmits(['mapClick'])

const overlay = useOverlay()
const slideover = overlay.create(MapSlideover)
const mapElement = ref<HTMLElement | null>(null)
const bounds = ref([
  [0, 0],
  [900, 1600],
])
const mapInstance = ref<L.Map | null>(null)
const previewPolygonLayer = ref<L.Polygon | null>(null)
const markerLayers = ref<L.Layer[]>([])

onMounted(() => {
  if (!mapElement.value) return

  const map = L.map(mapElement.value, {
    crs: L.CRS.Simple,
    attributionControl: false,
    zoomControl: false,
    wheelPxPerZoomLevel: 150,
    zoomDelta: 0.1,
    scrollWheelZoom: true,
    wheelDebounceTime: 40,
    zoomSnap: 0.1,
    minZoom: -0.5,
    maxZoom: 4,
  })

  mapInstance.value = map

  L.imageOverlay(props.imageUrl, bounds.value as L.LatLngBoundsExpression).addTo(map)

  addMarkers()
  addPreviewPolygon()

  map
    .fitBounds(bounds.value as L.LatLngBoundsExpression)
    .on('click', (event) => emits('mapClick', event))
})

const addMarkers = () => {
  if (!mapInstance.value) return

  markerLayers.value.forEach((layer) => {
    if (mapInstance.value) {
      mapInstance.value.removeLayer(layer)
    }
  })

  markerLayers.value = []

  props.markers.forEach((marker) => {
    if (marker.coordinates?.length) {
      if (marker.type === 'point') {
        const textIcon = L.divIcon({
          className: 'text-marker',
          html: props.showLabel
            ? `<div class="text-label">${marker.label}</div>`
            : `<div class="hidden-label"><span class="marker-label">${marker.label}</span></div>`,
          iconSize: undefined,
        })

        const markerLayer = L.marker([marker.coordinates[0].y, marker.coordinates[0].x], {
          icon: textIcon,
        })
          .addTo(mapInstance.value as L.Map)
          .on('click', () => slideover.open({ marker }))

        markerLayers.value.push(markerLayer)
      } else {
        const polygonPoints = marker.coordinates.map((coord) => [
          coord.y,
          coord.x,
        ]) as L.LatLngExpression[]

        const polygonLayer = L.polygon(polygonPoints, {
          className: props.showLabel ? 'polygon-with-label' : 'polygon-hover-label',
          color: '#ff6467',
          fillColor: '#0f172b',
          fillOpacity: 0.25,
          weight: 2,
        }).addTo(mapInstance.value as L.Map)

        if (props.showLabel) {
          polygonLayer.bindTooltip(marker.label, {
            permanent: true,
            direction: 'center',
            className: 'polygon-tooltip-visible',
            interactive: false,
          })
        } else {
          polygonLayer.bindTooltip(marker.label, {
            permanent: false,
            direction: 'center',
            className: 'polygon-tooltip-hover',
            interactive: false,
          })
        }

        polygonLayer.on('click', () => slideover.open({ marker }))
        markerLayers.value.push(polygonLayer)
      }
    }
  })
}

const addPreviewPolygon = () => {
  if (!mapInstance.value) return

  if (previewPolygonLayer.value) {
    mapInstance.value.removeLayer(previewPolygonLayer.value)
    previewPolygonLayer.value = null
  }

  if (props.polygonesPreview && props.polygonesPreview?.coordinates?.length > 0) {
    const polygonPoints = props.polygonesPreview.coordinates.map((c) => [
      c.y,
      c.x,
    ]) as L.LatLngExpression[]

    previewPolygonLayer.value = L.polygon(polygonPoints, {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2,
    }).addTo(mapInstance.value as L.Map)
  }
}

watch(
  () => props.showLabel,
  () => {
    if (mapInstance.value) {
      addMarkers()
    }
  }
)

watch(
  () => props.polygonesPreview,
  () => {
    if (mapInstance.value) {
      addPreviewPolygon()
    }
  },
  { deep: true }
)

watch(
  () => props.markers,
  () => {
    if (mapInstance.value) {
      addMarkers()
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="fixed top-0 left-0 size-full overflow-hidden z-0">
    <div ref="mapElement" class="size-full" />
  </div>
</template>

<style>
@reference 'tailwindcss';
@reference '@nuxt/ui';

.leaflet-container {
  @apply bg-transparent;
}

.leaflet-image-layer {
  @apply rounded-lg ring ring-default;
}

.leaflet-marker-icon {
  @apply -translate-x-1/2 -translate-y-1/2;
}

.text-label {
  @apply text-sm font-medium whitespace-nowrap;
  @apply bg-default/75 backdrop-blur-lg rounded-full px-3 py-1;
  @apply transition-all duration-200 ease-in-out;
  @apply hover:text-primary;
}

.hidden-label {
  @apply bg-default/75 backdrop-blur-lg rounded-full size-4;
  @apply transition-all duration-200 ease-in-out;
  @apply ring-2 ring-primary hover:ring-transparent;
  @apply hover:size-auto hover:px-3 hover:py-1;
}

.hidden-label .marker-label {
  @apply hidden;
}

.hidden-label:hover .marker-label {
  @apply block whitespace-nowrap text-sm font-medium;
}

.polygon-tooltip-visible {
  @apply bg-transparent border-none shadow-none backdrop-blur-none;
  @apply text-base text-white font-medium;
}

.polygon-tooltip-hover {
  @apply bg-transparent border-none shadow-none backdrop-blur-none;
  @apply text-base text-white font-medium;
}
</style>
