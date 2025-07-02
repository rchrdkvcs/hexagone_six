<template>
  <div class="relative w-full mx-auto overflow-hidden rounded-lg ring-2 ring-default">
    <!-- Image de base (après) -->
    <img
      :src="afterImage"
      :alt="afterAlt"
      class="w-full h-auto block"
      ref="afterImg"
    />

    <!-- Container pour l'image avant avec masque -->
    <div
      class="absolute top-0 left-0 h-full overflow-hidden transition-all duration-75 ease-out"
      :style="{ width: sliderPosition + '%' }"
    >
      <img
        :src="beforeImage"
        :alt="beforeAlt"
        class="w-full h-full object-cover"
        :style="{ width: containerWidth + 'px' }"
      />
    </div>

    <!-- Ligne de séparation et handle -->
    <div
      class="absolute top-0 h-full w-0.5 bg-primary shadow-lg cursor-ew-resize select-none"
      :style="{ left: sliderPosition + '%' }"
    >
      <!-- Handle circulaire -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-lg ring ring-muted flex items-center justify-center">
        <div class="flex space-x-0.5">
          <div class="w-0.5 h-4 bg-muted"></div>
          <div class="w-0.5 h-4 bg-muted"></div>
        </div>
      </div>
    </div>

    <!-- Zone de glissement invisible -->
    <div
      class="absolute top-0 left-0 w-full h-full cursor-ew-resize"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @mousemove="onDrag"
      @touchmove="onDrag"
    ></div>

    <!-- Labels -->
    <UBadge :label="beforeLabel" color="primary" size="lg" class="absolute top-4 left-4"/>
    <UBadge :label="afterLabel" color="primary" size="lg" class="absolute top-4 right-4"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
}

withDefaults(defineProps<Props>(), {
  beforeAlt: 'Avant',
  afterAlt: 'Après',
  beforeLabel: 'Avant',
  afterLabel: 'Après'
})

const sliderPosition = ref(50) // Position en pourcentage
const isDragging = ref(false)
const containerWidth = ref(0)
const afterImg = ref<HTMLImageElement>()

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  updateSliderPosition(e)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  updateSliderPosition(e)
}

const updateSliderPosition = (e: MouseEvent | TouchEvent) => {
  if (!afterImg.value) return

  const rect = afterImg.value.getBoundingClientRect()
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const x = clientX - rect.left
  const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)

  sliderPosition.value = percentage
}

const stopDrag = () => {
  isDragging.value = false
}

const updateContainerWidth = () => {
  if (afterImg.value) {
    containerWidth.value = afterImg.value.clientWidth
  }
}

onMounted(() => {
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('touchmove', onDrag)
  window.addEventListener('resize', updateContainerWidth)

  // Attendre que l'image soit chargée pour obtenir les bonnes dimensions
  if (afterImg.value) {
    if (afterImg.value.complete) {
      updateContainerWidth()
    } else {
      afterImg.value.addEventListener('load', updateContainerWidth)
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  window.removeEventListener('resize', updateContainerWidth)
})
</script>

<style scoped>
/* Désactiver la sélection de texte pendant le glissement */
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
