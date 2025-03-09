<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
  label: String,
  href: {
    type: String,
    default: '/',
  },
})
</script>

<template>
  <Link
    :href="props.href"
    class="relative px-8 flex justify-center items-center h-full group before:(content-[''] w-full h-0 hover:h-5px bg-#00ffe5 bottom-0 left-0 absolute transition-all ease-in-out duration-300) after:(content-[''] bg-gradient-to-t from-[#00ffe5] to-transparent w-full h-0 hover:h-1/2 bottom-0 left-0 absolute transition-all ease-in-out duration-300)"
  >
    <span class="uppercase text-white text-xl font-bold">{{ props.label }}</span>
  </Link>
</template>
