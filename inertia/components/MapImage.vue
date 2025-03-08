<script lang="ts" setup>
import { computed, ref } from 'vue'
import FullScreenIcon from '~/components/Icones/FullScreenIcon.vue'
import ExitFullScreenIcon from '~/components/Icones/ExitFullScreenIcon.vue'

const props = defineProps<{
  id: string
  currentImageIndex: number
}>()

const image = ref<HTMLImageElement | null>(null)
const container = ref<HTMLElement | null>(null)
const scale = ref(1)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const startDragPosition = ref({ x: 0, y: 0 })
const isFullscreen = ref(false)
const isImageLoaded = ref(false)
const minScale = ref(0.75)

const centerAndFitImage = () => {
  if (image.value && container.value) {
    const containerWidth = container.value.clientWidth
    const containerHeight = container.value.clientHeight
    const imageWidth = image.value.naturalWidth
    const imageHeight = image.value.naturalHeight

    const scaleToFit = Math.min(containerWidth / imageWidth, containerHeight / imageHeight)
    scale.value = scaleToFit

    position.value = {
      x: (containerWidth - imageWidth * scaleToFit) / 2,
      y: (containerHeight - imageHeight * scaleToFit) / 2,
    }
  }
}

const initializeAfterImageLoad = () => {
  centerAndFitImage()
  isImageLoaded.value = true
}

const imageStyle = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})`,
  transformOrigin: 'top left',
}))

const onMouseMove = (event: MouseEvent) => {
  if (image.value && isImageLoaded.value) {
    if (isDragging.value) {
      const dx = event.clientX - startDragPosition.value.x
      const dy = event.clientY - startDragPosition.value.y
      position.value = {
        x: position.value.x + dx,
        y: position.value.y + dy,
      }
      startDragPosition.value = { x: event.clientX, y: event.clientY }
    }
  }
}

const onWheel = (event: WheelEvent) => {
  if (!isImageLoaded.value) return
  event.preventDefault()

  const delta = event.deltaY < 0 ? 1.1 : 0.9
  const newScale = Math.max(minScale.value, scale.value * delta)

  if (image.value && container.value) {
    const containerWidth = container.value.clientWidth
    const containerHeight = container.value.clientHeight

    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    const offsetX = (centerX - position.value.x) / scale.value
    const offsetY = (centerY - position.value.y) / scale.value

    position.value = {
      x: centerX - offsetX * newScale,
      y: centerY - offsetY * newScale,
    }
  }

  scale.value = newScale
}

const onMouseDown = (event: MouseEvent) => {
  if (event.button === 0 && isImageLoaded.value) {
    isDragging.value = true
    startDragPosition.value = { x: event.clientX, y: event.clientY }
  }
}

const onMouseUp = (event: MouseEvent) => {
  if (event.button === 0) {
    isDragging.value = false
  }
}

const preventImageDragAndCopy = (event: Event) => {
  event.preventDefault()
}

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await container.value?.requestFullscreen()
    isFullscreen.value = true
  } else {
    await document.exitFullscreen()
    isFullscreen.value = false
  }
}
</script>

<template>
  <div
    ref="container"
    class="size-full w-screen overflow-hidden relative bg-#24262A/50 backdrop-blur-lg"
    @mousedown="onMouseDown"
    @mouseleave="onMouseUp"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @wheel="onWheel"
  >
    <img
      ref="image"
      :src="'/inertia/assets/images/maps/' + props.id + '/' + props.currentImageIndex + '.jpg'"
      :style="imageStyle"
      alt=""
      class=""
      @contextmenu="preventImageDragAndCopy"
      @dragstart="preventImageDragAndCopy"
      @load="initializeAfterImageLoad"
    />

    <button
      class="size-8 absolute bottom-4 right-4 text-white/75 bg-#24262A/75 border border-white/15 rounded-lg p-1 flex items-center justify-center backdrop-blur-md hover:(bg-#2499FF scale-105) transition-all duration-150 ease-in-out"
      @click="toggleFullscreen"
    >
      <FullScreenIcon v-if="!isFullscreen" />
      <ExitFullScreenIcon v-else />
    </button>
  </div>
</template>
