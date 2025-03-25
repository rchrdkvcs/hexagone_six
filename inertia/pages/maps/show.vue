<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, onMounted, ref } from 'vue'
import MapLeaflet from '~/components/MapLeaflet.vue'
import MapLayout from '~/layouts/MapLayout.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'

defineOptions({
  layout: MapLayout,
})

const props = defineProps<{
  map: InferPageProps<MapsController, 'show'>['map']
}>()

const totalImages = ref(0)
const currentImageIndex = ref(1)

const imageUrl = computed(() => `/images/maps/${props.map.slug}/${currentImageIndex.value}.jpg`)

const imageWidth = ref(1600)
const imageHeight = ref(900)

interface Marker {
  id: number
  tooltip: string
  x: number
  y: number
}

// Use map.markers from the database or empty array if not available
const markers = ref<Marker[]>(props.map.markers || [])

const loadImage = (index: number) => {
  if (index >= 1 && index <= totalImages.value) {
    currentImageIndex.value = index
  }
}

onMounted(() => {
  totalImages.value = props.map.stageCount ?? 0
})
</script>

<template>
  <Head :title="props.map.name" />

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
      />
    </div>
  </MapLayout>
</template>
