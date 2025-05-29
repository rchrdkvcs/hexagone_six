<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import Maps from '~/layouts/maps.vue'
import MapLeaflet from '~/components/maps/MapLeaflet.vue'
import MarkerModal from '~/components/maps/MarkerModal.vue'

import type Map from '#maps/models/map'
import { LeafletMouseEvent } from 'leaflet'

defineOptions({
  layout: Maps,
})

const props = defineProps<{
  map: Map
}>()

const overlay = useOverlay()
const markerModal = overlay.create(MarkerModal)
const editMode = ref(false)

const handelMapClick = (event: LeafletMouseEvent) => {
  const { map } = props
  markerModal.open({ event, map })
}
</script>

<template>
  <Head :title="map.name" />

  <div class="fixed top-0 left-0 size-full overflow-hidden z-0">
    <MapLeaflet
      :key="props.map.markers.length"
      :markers="props.map.markers"
      @mapClick="handelMapClick"
    />
  </div>

  <UButton
    class="z-50 fixed top-20 left-4 cursor-pointer"
    icon="lucide:plus"
    label="Proposer un point"
    @click="editMode = !editMode"
  />
</template>
