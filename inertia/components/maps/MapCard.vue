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
    class="group relative rounded-lg overflow-hidden border border-default transition-all duration-300 shadow-md"
  >
    <div class="overflow-hidden relative">
      <img
        :alt="name"
        :src="imageSrc"
        class="w-full object-cover aspect-video transform group-hover:scale-105 transition-transform duration-500"
      />

      <div
        class="absolute inset-0 backdrop-filter backdrop-blur-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300"
        style="
          -webkit-mask-image: linear-gradient(to top, black 20%, transparent 75%);
          mask-image: linear-gradient(to top, black 20%, transparent 75%);
        "
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-primary-800/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <div class="absolute bottom-0 left-0 w-full p-4 z-10">
        <p
          class="text-lg text-white/80 font-medium group-hover:text-2xl group-hover:text-white transition-all duration-300 origin-left"
        >
          {{ name }}
        </p>
      </div>
    </div>

    <!-- Icône flèche -->
    <div
      class="absolute top-2 right-2 size-8 rounded-full bg-neutral/75 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <UIcon name="lucide:arrow-right" />
    </div>
  </Link>
</template>
