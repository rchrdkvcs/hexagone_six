<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps<{
  imagesUrl: string[]
}>()

const selectedIndex = ref(0)
const isFullscreen = ref(false)
const imageLoaded = ref<boolean[]>([])
const thumbnailContainer = ref<HTMLElement>()
const mainImage = ref<HTMLImageElement>()

// Initialiser l'état de chargement des images
onMounted(() => {
  imageLoaded.value = new Array(props.imagesUrl.length).fill(false)
  // Pré-charger les 3 premières images
  preloadImages([0, 1, 2])
})

// Image principale avec transition
const currentImageUrl = computed(() => props.imagesUrl[selectedIndex.value])

// Navigation
const goToImage = async (index: number) => {
  if (index === selectedIndex.value) return

  selectedIndex.value = index

  // Pré-charger les images adjacentes
  const toPreload = [
    index - 1 >= 0 ? index - 1 : props.imagesUrl.length - 1,
    index + 1 < props.imagesUrl.length ? index + 1 : 0,
  ]
  preloadImages(toPreload)

  // Faire défiler vers la thumbnail active
  await nextTick()
  scrollToActiveThumbnail()
}

const next = () => {
  const newIndex = (selectedIndex.value + 1) % props.imagesUrl.length
  goToImage(newIndex)
}

const prev = () => {
  const newIndex = (selectedIndex.value - 1 + props.imagesUrl.length) % props.imagesUrl.length
  goToImage(newIndex)
}

// Pré-chargement optimisé
const preloadImages = (indices: number[]) => {
  indices.forEach((index) => {
    if (index >= 0 && index < props.imagesUrl.length && !imageLoaded.value[index]) {
      const img = new Image()
      img.onload = () => {
        imageLoaded.value[index] = true
      }
      img.src = props.imagesUrl[index]
    }
  })
}

// Scroll vers la thumbnail active
const scrollToActiveThumbnail = () => {
  if (!thumbnailContainer.value) return

  const activeElement = thumbnailContainer.value.children[selectedIndex.value] as HTMLElement
  if (activeElement) {
    activeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
}

// Mode plein écran
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value

  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Gestion des raccourcis clavier
const handleKeydown = (event: KeyboardEvent) => {
  if (!isFullscreen.value) return

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prev()
      break
    case 'ArrowRight':
      event.preventDefault()
      next()
      break
    case 'Escape':
      event.preventDefault()
      toggleFullscreen()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

// Swipe gestures pour mobile
const touchStart = ref<{ x: number; y: number } | null>(null)

const handleTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0]
  touchStart.value = { x: touch.clientX, y: touch.clientY }
}

const handleTouchEnd = (event: TouchEvent) => {
  if (!touchStart.value) return

  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStart.value.x
  const deltaY = Math.abs(touch.clientY - touchStart.value.y)

  // Ignorer si le mouvement vertical est trop important
  if (deltaY > 100) return

  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      prev()
    } else {
      next()
    }
  }

  touchStart.value = null
}
</script>

<template>
  <!-- Mode plein écran -->
  <div
    v-if="isFullscreen"
    class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
    @click="toggleFullscreen"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="relative w-full h-full flex items-center justify-center p-4">
      <!-- Image principale en plein écran -->
      <img
        :src="currentImageUrl"
        :alt="`Image ${selectedIndex + 1}`"
        class="max-w-full max-h-full object-contain"
        @click.stop
      />

      <!-- Contrôles plein écran -->
      <div class="absolute top-4 right-4 flex gap-2">
        <UBadge color="neutral" variant="solid" class="bg-black/50 text-white">
          {{ selectedIndex + 1 }} / {{ imagesUrl.length }}
        </UBadge>
        <UButton
          icon="lucide:x"
          @click.stop="toggleFullscreen"
          variant="ghost"
          color="neutral"
          size="lg"
        />
      </div>

      <!-- Navigation plein écran -->
      <UButton
        v-if="imagesUrl.length > 1"
        icon="lucide:chevron-left"
        @click.stop="prev"
        class="absolute left-4 top-1/2 -translate-y-1/2"
        variant="ghost"
        color="neutral"
        size="xl"
      />

      <UButton
        v-if="imagesUrl.length > 1"
        icon="lucide:chevron-right"
        @click.stop="next"
        class="absolute right-4 top-1/2 -translate-y-1/2"
        variant="ghost"
        color="neutral"
        size="xl"
      />
    </div>
  </div>

  <!-- Mode normal -->
  <div class="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
    <UContainer class="h-full flex flex-col p-4 gap-4 max-w-full">
      <!-- En-tête -->
      <div class="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 class="text-xl font-bold text-highlighted">Galerie Photos</h1>
          <p class="text-muted text-sm">
            {{ imagesUrl.length }} photo{{ imagesUrl.length > 1 ? 's' : '' }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            icon="lucide:expand"
            label="Plein écran"
            @click="toggleFullscreen"
            variant="soft"
            color="neutral"
          />
        </div>
      </div>

      <!-- Image principale -->
      <div class="flex-1 min-h-0">
        <div class="h-full bg-default ring ring-default rounded-xl overflow-hidden relative group">
          <!-- Skeleton loader -->
          <div
            v-if="!imageLoaded[selectedIndex]"
            class="absolute inset-0 bg-muted animate-pulse flex items-center justify-center"
          >
            <UIcon name="lucide:image" class="w-16 h-16 text-muted" />
          </div>

          <!-- Image principale -->
          <div class="h-full w-full flex items-center justify-center p-4">
            <img
              ref="mainImage"
              :src="currentImageUrl"
              :alt="`Image ${selectedIndex + 1}`"
              class="object-contain max-h-full max-w-full rounded-lg shadow-lg transition-opacity duration-300 cursor-pointer"
              :class="{
                'opacity-100': imageLoaded[selectedIndex],
                'opacity-0': !imageLoaded[selectedIndex],
              }"
              @load="imageLoaded[selectedIndex] = true"
              @click="toggleFullscreen"
            />
          </div>

          <!-- Contrôles de navigation -->
          <template v-if="imagesUrl.length > 1">
            <UButton
              icon="lucide:chevron-left"
              @click="prev"
              class="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              variant="soft"
              color="neutral"
              size="lg"
            />

            <UButton
              icon="lucide:chevron-right"
              @click="next"
              class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              variant="soft"
              color="neutral"
              size="lg"
            />
          </template>

          <!-- Indicateurs et actions -->
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <UBadge color="neutral" variant="solid" class="bg-black/50 text-white">
              {{ selectedIndex + 1 }} / {{ imagesUrl.length }}
            </UBadge>

            <UButton
              icon="lucide:expand"
              @click="toggleFullscreen"
              variant="soft"
              color="neutral"
              size="sm"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      <!-- Thumbnails avec navigation horizontale -->
      <div class="flex-shrink-0 space-y-3 pb-2">
        <div class="relative">
          <!-- Fade gradients sur les côtés -->
          <div
            class="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-default to-transparent z-10 pointer-events-none"
          />
          <div
            class="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-default to-transparent z-10 pointer-events-none"
          />

          <div
            ref="thumbnailContainer"
            class="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-4"
            style="scroll-snap-type: x mandatory"
          >
            <div
              v-for="(image, index) in imagesUrl"
              :key="index"
              class="flex-shrink-0 relative group cursor-pointer"
              style="scroll-snap-align: center"
              @click="goToImage(index)"
            >
              <div
                class="w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ring-2"
                :class="
                  selectedIndex === index
                    ? 'ring-primary shadow-lg scale-110'
                    : 'ring-transparent hover:ring-accented hover:scale-105'
                "
              >
                <!-- Skeleton pour thumbnail -->
                <div
                  v-if="!imageLoaded[index]"
                  class="w-full h-full bg-muted animate-pulse flex items-center justify-center"
                >
                  <UIcon name="lucide:image" class="w-6 h-6 text-muted" />
                </div>

                <img
                  :src="image"
                  :alt="`Thumbnail ${index + 1}`"
                  class="w-full h-full object-cover transition-opacity duration-300"
                  :class="{ 'opacity-100': imageLoaded[index], 'opacity-0': !imageLoaded[index] }"
                  loading="lazy"
                  @load="imageLoaded[index] = true"
                />
              </div>

              <!-- Indicateur image active -->
              <div
                v-if="selectedIndex === index"
                class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 justify-center w-full">
          <UButton
            icon="lucide:chevron-left"
            @click="() => thumbnailContainer?.scrollBy({ left: -200, behavior: 'smooth' })"
            variant="ghost"
            size="sm"
          />
          <UButton
            icon="lucide:chevron-right"
            @click="() => thumbnailContainer?.scrollBy({ left: 200, behavior: 'smooth' })"
            variant="ghost"
            size="sm"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Optimisations pour les performances */
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Améliorer le rendu des images */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Animation pour les thumbnails */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.thumbnail-enter-active {
  animation: fadeIn 0.3s ease-out;
}

/* Optimisations GPU */
.group:hover img,
.transition-all,
.transition-opacity {
  will-change: transform, opacity;
  backface-visibility: hidden;
}
</style>
