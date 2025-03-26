<script lang="ts" setup>
import BackIcone from '~/components/Icones/BackIcone.vue'

defineProps<{
  totalImages?: number
  currentImageIndex?: number
}>()

const emit = defineEmits(['loadImage'])

const loadImage = (index: number) => {
  emit('loadImage', index)
}

const goBack = () => {
  window.history.back()
}
</script>

<template>
  <button
    class="fixed top-4 left-4 px-3 py-2 border border-transparent hover:(bg-white text-black border-white/15) rounded-xl transition-colors duration-300 ease-in-out z-999 color-white/80 bg-#24262A/50 border border-white/15 flex items-center gap-2 backdrop-blur-lg"
    @click="goBack"
  >
    <BackIcone class="w-6 h-6" />
    <span>Retour</span>
  </button>

  <nav
    v-if="totalImages !== undefined"
    class="fixed z-999 top-4 left-1/2 -translate-x-1/2 h-fit w-fit bg-#24262A/50 backdrop-blur-xl rounded-xl border border-white/15 p-2"
  >
    <ul class="h-full flex justify-center items-center gap-2">
      <li v-for="index in totalImages" :key="index" class="h-full relative">
        <button
          :class="[
            index === currentImageIndex
              ? 'bg-white/15 color-white/100'
              : 'color-white/80 bg-transparent',
          ]"
          class="px-3 py-2 font-medium border border-transparent hover:(bg-white text-black border-white/15) rounded-lg transition-colors duration-300 ease-in-out"
          @click="loadImage(index)"
        >
          <span class="">Etage {{ index }}</span>
        </button>
      </li>
    </ul>
  </nav>

  <main class="w-full h-screen overflow-hidden">
    <slot />
  </main>
</template>
