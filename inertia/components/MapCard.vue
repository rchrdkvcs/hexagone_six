<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
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
    :href="props.href"
    class="relative text-black transition-all ease-in-out duration-300 group after:(content-[''] bg-gradient-to-t from-[#00ffe5] to-transparent w-full h-1/2 opacity-0 hover:opacity-75 bottom-44px left-0 absolute transition-all ease-in-out duration-300)"
  >
    <img :src="props.imageSrc" alt="" />
    <div
      class="w-full bg-white/75 group-hover:bg-#00ffe5 py-2 backdrop-blur-sm flex justify-center items-center transition ease-in-out duration-300"
    >
      <p class="uppercase italic text-2xl font-scoutcond">{{ props.name }}</p>
    </div>
  </Link>
</template>
