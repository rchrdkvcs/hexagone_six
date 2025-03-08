<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'
import { mapsData } from '~/data/maps'
import MapLayout from '~/layouts/MapLayout.vue'
import MapImage from '~/components/MapImage.vue'

// Définir le layout à utiliser
defineOptions({
  layout: MapLayout,
})

const props = defineProps<{
  id: string
}>()

const totalImages = ref(0)
const currentImageIndex = ref(1)

const loadImage = (index: number) => {
  if (index >= 1 && index <= totalImages.value) {
    currentImageIndex.value = index
  }
}

onMounted(() => {
  totalImages.value = mapsData.find((mapsData) => mapsData.id === props.id)?.stage ?? 0
})
</script>

<template>
  <Head title="Cartes" />

  <!-- Passer les props au layout -->
  <MapLayout
    :currentImageIndex="currentImageIndex"
    :totalImages="totalImages"
    @loadImage="loadImage"
  >
    <!-- Contenu de la page -->
    <MapImage :id="id" :currentImageIndex="currentImageIndex" />
  </MapLayout>
</template>
