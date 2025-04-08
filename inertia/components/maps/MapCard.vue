<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'

defineProps({
  name: String,
  href: {
    type: String,
    default: '/',
  },
  imageSrc: String,
})
</script>

<template>
  <Link
    :href="href"
    class="relative text-black transition ease-in-out duration-300 group rounded-xl overflow-hidden border border-white/15 hover:(scale-105 z-100) z-10 max-w-400px"
  >
    <img :alt="name" :src="imageSrc" />
    <div
      class="w-full bg-#24262A/50 group-hover:(bg-white color-black) py-2 backdrop-blur-md flex justify-center items-center transition ease-in-out duration-300 color-white/80"
    >
      <p class="text-xl font-medium">{{ name }}</p>
    </div>
  </Link>
</template>
