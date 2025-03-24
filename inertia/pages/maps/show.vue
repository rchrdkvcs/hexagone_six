<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, onMounted, ref } from 'vue'
import { mapsData } from '~/data/maps'
import MapLeaflet from '~/components/MapLeaflet.vue'
import MapLayout from '~/layouts/MapLayout.vue'

defineOptions({
  layout: MapLayout,
})

const props = defineProps<{
  id: string
}>()

const map = ref(null)
const totalImages = ref(0)
const currentImageIndex = ref(1)

const imageUrl = computed(() => `/images/maps/${props.id}/${currentImageIndex.value}.jpg`)

const imageWidth = ref(1600)
const imageHeight = ref(900)

const markers = ref<any>([
  { id: 1, tooltip: 'Marker 1', x: 100, y: 100 },
  { id: 2, tooltip: 'Marker 2', x: 200, y: 200 },
  { id: 3, tooltip: 'Marker 3', x: 300, y: 300 },
])

const loadImage = (index: number) => {
  if (index >= 1 && index <= totalImages.value) {
    currentImageIndex.value = index
  }
}

const onMarkerClick = (marker) => {
  console.log('Marker clicked:', marker)
}

onMounted(() => {
  totalImages.value = mapsData.find((mapData) => mapData.id === props.id)?.stage ?? 0
})
</script>

<template>
  <Head title="Cartes" />

  <MapLayout
    :currentImageIndex="currentImageIndex"
    :totalImages="totalImages"
    @loadImage="loadImage"
  >
    <div class="relative w-full h-full bg-black/25 backdrop-blur-xl">
      <MapLeaflet
        ref="map"
        :imageHeight="imageHeight"
        :imageUrl="imageUrl"
        :imageWidth="imageWidth"
        :markers="markers"
        @marker-click="onMarkerClick"
      />
    </div>
  </MapLayout>
</template>
