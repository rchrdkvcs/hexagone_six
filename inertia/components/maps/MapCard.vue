<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'

defineProps<{
  name: string
  imageSrc: string
  href: string
}>()
</script>

<template>
  <Link
    :href="href"
    class="group relative rounded-xl overflow-hidden border border-white/10 hover:(transform scale-102) transition-all duration-300 shadow-md flex flex-col"
  >
    <div class="overflow-hidden relative">
      <img
        :alt="name"
        :src="imageSrc"
        class="w-full object-cover aspect-video transform group-hover:scale-105 transition-transform duration-500"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-primary-700/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>

    <div
      class="w-full backdrop-blur-md bg-primary-800/25 py-3 px-4 transition-all duration-300 relative z-10 border-t border-white/10"
    >
      <p
        class="text-lg font-medium text-white group-hover:translate-x-1 transition-transform duration-300"
      >
        {{ name }}
      </p>
    </div>

    <div
      class="absolute top-2 right-2 size-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <i class="i-mdi:arrow-right text-white"></i>
    </div>
  </Link>
</template>
