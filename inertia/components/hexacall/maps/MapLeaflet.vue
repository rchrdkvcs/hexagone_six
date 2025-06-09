<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapSlideover from '~/components/hexacall/maps/MapSlideover.vue'

import type Marker from '#markers/models/marker'

const props = defineProps<{
  imageUrl: string
  markers: Marker[]
  showLabel: boolean
  polygonesPreview: { coordinates: { x: number; y: number }[] } | null
  editMode: 'marker' | 'polygon' | null
}>()

const emits = defineEmits(['mapClick'])

const overlay = useOverlay()
const slideover = overlay.create(MapSlideover)
const mapElement = shallowRef<HTMLElement | null>(null)
const bounds = shallowRef([
  [0, 0],
  [900, 1600],
])
const mapInstance = shallowRef<L.Map | null>(null)
const previewPolygonLayer = shallowRef<L.Polygon | null>(null)
const markerLayers = shallowRef<L.Layer[]>([])
const selectedMarker = ref<Marker | null>(null)

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

const handleSlideover = (marker: Marker) => {
  if (props.editMode === null) {
    selectedMarker.value = marker
    slideover.open({ marker }).result.then(() => {
      selectedMarker.value = null
    })
  }
}

const addMarkers = () => {
  if (!mapInstance.value) return

  markerLayers.value.forEach((layer) => {
    mapInstance.value?.removeLayer(layer)
  })

  markerLayers.value = []

  props.markers.forEach((marker) => {
    if (marker.coordinates?.length) {
      if (marker.type === 'point') {
        const isSelected = selectedMarker.value?.id === marker.id
        const textIcon = L.divIcon({
          className: 'text-marker',
          html: `<div class="${props.showLabel || isSelected ? 'text-label' : 'hidden-label'} ${isSelected ? 'selected' : ''}">${props.showLabel || isSelected ? marker.label : `<span class="marker-label">${marker.label}</span>`}</div>`,
          iconSize: undefined,
        })

        const markerLayer = L.marker([marker.coordinates[0].y, marker.coordinates[0].x], {
          icon: textIcon,
        })
          .addTo(mapInstance.value as L.Map)
          .on('click', () => handleSlideover(marker))

        markerLayers.value.push(markerLayer)
      } else {
        const polygonPoints = marker.coordinates.map((coord) => [
          coord.y,
          coord.x,
        ]) as L.LatLngExpression[]

        const polygonLayer = L.polygon(polygonPoints, {
          className: props.showLabel ? 'polygon-with-label' : 'polygon-hover-label',
          color: '#ff6467',
          fillColor: '#ff6467',
          fillOpacity: 0.25,
          weight: 2,
        }).addTo(mapInstance.value as L.Map)

        if (props.showLabel) {
          polygonLayer.bindTooltip(marker.label, {
            permanent: true,
            direction: 'center',
            className: `polygon-tooltip ${
              selectedMarker.value?.id === marker.id ? 'selected' : ''
            }`,
          })
        } else {
          polygonLayer.bindTooltip(marker.label, {
            permanent: selectedMarker.value?.id === marker.id,
            direction: 'center',
            className: `polygon-tooltip ${
              selectedMarker.value?.id === marker.id ? 'selected' : ''
            }`,
          })
        }

        polygonLayer.on('click', () => handleSlideover(marker))
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

watch(
  () => selectedMarker.value,
  () => {
    if (mapInstance.value) {
      addMarkers()
    }
  }
)
</script>

<template>
  <div
    class="fixed top-0 left-0 size-full overflow-hidden z-0"
    :class="{ 'edit-mode': editMode !== null }"
  >
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

/* Nouveau style pour le mode édition */
.edit-mode {
  cursor: crosshair !important;
}

/* Pour s'assurer que le curseur s'applique à toute la carte */
.edit-mode .leaflet-container,
.edit-mode .leaflet-interactive {
  cursor: crosshair !important;
}

.text-label {
  @apply text-sm font-medium whitespace-nowrap;
  @apply bg-default/75 backdrop-blur-lg rounded-full px-3 py-1;
  @apply transition-all duration-200 ease-in-out;
  @apply hover:text-primary;
}

.text-label.selected,
.hidden-label.selected {
  @apply bg-primary backdrop-blur-lg rounded-full px-3 py-1 text-slate-900;
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

.polygon-tooltip {
  @apply border-none shadow-none text-default;
  @apply text-sm font-medium whitespace-nowrap;
  @apply bg-default/75 backdrop-blur-lg rounded-full px-3 py-1;
}

.polygon-tooltip.selected {
  @apply bg-primary backdrop-blur-lg rounded-full px-3 py-1 text-slate-900;
}
</style>
