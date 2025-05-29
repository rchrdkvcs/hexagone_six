<script lang="ts" setup>
import { onMounted, Reactive, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapSlideover from '~/components/maps/MapSlideover.vue'

import type Marker from '#markers/models/marker'

const props = defineProps<{
  markers: Reactive<Marker[]>
}>()

const emits = defineEmits(['mapClick'])

const overlay = useOverlay()
const slideover = overlay.create(MapSlideover)
const mapElement = ref(null)
const bounds = ref([
  [0, 0],
  [900, 1600],
])

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

  L.imageOverlay('/public/images/maps/bank/1.jpg', bounds.value as L.LatLngBoundsExpression).addTo(
    map
  )

  props.markers.forEach((marker) => {
    if (marker.coordinates?.length) {
      if (marker.type === 'point') {
        const textIcon = L.divIcon({
          className: 'text-marker',
          html: `<div class="text-label">${marker.label}</div>`,
          iconSize: undefined,
        })

        L.marker([marker.coordinates[0].y, marker.coordinates[0].x], { icon: textIcon })
          .addTo(map)
          .on('click', () => slideover.open({ marker }))
      } else {
        const polygonPoints = marker.coordinates.map((coord) => [
          coord.y,
          coord.x,
        ]) as L.LatLngExpression[]
        L.polygon(polygonPoints).addTo(map).bindTooltip(marker.label)
      }
    }
  })

  map
    .fitBounds(bounds.value as L.LatLngBoundsExpression)
    .on('click', (event) => emits('mapClick', event))
})
</script>

<template>
  <div ref="mapElement" class="size-full" />
</template>

<style>
@reference "tailwindcss";
@reference "@nuxt/ui";

.leaflet-container {
  @apply bg-transparent;
}

.leaflet-image-layer {
  @apply rounded-lg ring ring-default;
}

.leaflet-marker-icon {
  @apply -translate-1/2;
}

.text-label {
  @apply text-sm font-medium whitespace-nowrap;
  @apply bg-default/75 backdrop-blur-lg rounded-full px-3 py-1;
  @apply transition-all duration-200 ease-in-out;
  @apply hover:text-primary;
}
</style>
