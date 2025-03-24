<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import LogoIcon from '~/components/Icones/LogoIcon.vue'
import DefaultButton from '~/components/Buttons/DefaultButton.vue'

defineProps<{
  totalImages?: number
  currentImageIndex?: number
}>()

const emit = defineEmits(['loadImage'])

const loadImage = (index: number) => {
  emit('loadImage', index)
}
</script>

<template>
  <div class="flex flex-col h-screen w-full">
    <header
      v-if="$slots.header || totalImages !== undefined"
      class="fixed top-0 left-0 pl-8 w-full h-16 bg-#24262A/75 flex justify-between items-center backdrop-blur-lg z-999"
    >
      <Link class="hover:scale-105 transition-all ease-in-out duration-300" href="/">
        <LogoIcon />
      </Link>
      <nav v-if="totalImages !== undefined" class="h-full">
        <ul slot="nav" class="h-full flex justify-center items-center">
          <li v-for="index in totalImages" :key="index" class="h-full">
            <button
              :class="{
                'before:h-5px': currentImageIndex === index,
                'before:h-0': currentImageIndex !== index,
              }"
              class="relative px-8 flex justify-center items-center h-full group before:(content-[''] w-full hover:h-5px bg-#00ffe5 bottom-0 left-0 absolute transition-all ease-in-out duration-300) after:(content-[''] w-full h-0 bg-gradient-to-t from-[#00ffe5] to-transparent hover:h-1/2 bottom-0 left-0 absolute transition-all ease-in-out duration-300)"
              @click="loadImage(index)"
            >
              <span class="uppercase text-white text-xl font-bold">Etage {{ index }}</span>
            </button>
          </li>
        </ul>
      </nav>
      <div class="h-full flex justify-center items-center">
        <DefaultButton href="/cartes" label="Retour" />
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center overflow-hidden">
      <slot />
    </main>
  </div>
</template>
