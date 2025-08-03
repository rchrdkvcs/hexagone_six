<template>
  <div
    ref="container"
    class="relative w-full mx-auto overflow-hidden rounded-lg ring-2 ring-default user-select-none"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
  >
    <!-- Image après (arrière-plan) -->
    <img
      :src="afterImage"
      :alt="afterAlt"
      class="w-full h-auto block pointer-events-none"
      draggable="false"
    />

    <!-- Image avant (avec clip-path) -->
    <img
      :src="beforeImage"
      :alt="beforeAlt"
      class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      :style="{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }"
      draggable="false"
    />

    <!-- Ligne de séparation -->
    <div
      class="absolute top-0 h-full w-0.5 bg-primary shadow-lg transition-opacity duration-200"
      :class="{ 'opacity-100': isDragging, 'opacity-80': !isDragging }"
      :style="{ left: `calc(${sliderPosition}% - 1px)` }"
    >
      <!-- Handle -->
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full shadow-xl flex items-center justify-center cursor-ew-resize transition-all duration-200 hover:scale-110"
        :class="{ 'scale-110 shadow-2xl': isDragging }"
      >
        <UIcon name="lucide:move-horizontal" class="w-6 h-6 dark:text-white text-primary" />
      </div>
    </div>

    <!-- Labels -->
    <div class="absolute top-4 left-4">
      <UBadge :label="beforeLabel" color="primary" variant="solid" size="md" />
    </div>
    <div class="absolute top-4 right-4">
      <UBadge :label="afterLabel" color="primary" variant="solid" size="md" />
    </div>

    <!-- Instructions (affichées uniquement au début) -->
    <div
      v-if="!hasInteracted"
      class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none': hasInteracted }"
    >
      <div
        class="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2 animate-pulse"
      >
        <UIcon name="lucide:hand" class="w-4 h-4" />
        <span class="text-sm font-medium">Glissez pour comparer</span>
      </div>
    </div>
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
  afterLabel: 'Après',
})

const container = ref<HTMLElement>()
const sliderPosition = ref(50)
const isDragging = ref(false)
const hasInteracted = ref(false)

const updateSliderPosition = (clientX: number) => {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()
  const x = clientX - rect.left
  const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)

  sliderPosition.value = percentage

  if (!hasInteracted.value) {
    hasInteracted.value = true
  }
}

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true
  updateSliderPosition(e.clientX)
}

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  isDragging.value = true
  updateSliderPosition(e.touches[0].clientX)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  e.preventDefault()
  updateSliderPosition(e.clientX)
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  e.preventDefault()
  updateSliderPosition(e.touches[0].clientX)
}

const handleEnd = () => {
  isDragging.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove, { passive: false })
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('mouseup', handleEnd)
  document.addEventListener('touchend', handleEnd)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('mouseup', handleEnd)
  document.removeEventListener('touchend', handleEnd)
})
</script>

<style scoped>
.user-select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Améliorer les performances pour les animations */
.user-select-none {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

/* Optimisations GPU */
img {
  will-change: clip-path;
  backface-visibility: hidden;
}
</style>
