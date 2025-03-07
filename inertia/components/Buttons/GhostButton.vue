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
    class="relative uppercase text-white text-xl font-bold px-8 flex justify-center items-center h-full group after:content-[''] after:w-full after:h-0 after:bg-gradient-to-t after:from-[#00ffe5]/75 after:to-[#00ffe5]/0 hover:after:h-1/2 after:bottom-0 after:left-0 after:absolute before:content-[''] before:w-full before:h-0 hover:before:h-[5px] before:bg-[#00ffe5] before:bottom-0 before:left-0 before:absolute before:transition-all before:ease-in-out before:duration-300 after:transition-all after:ease-in-out after:duration-300"
  >
    <span class="z-5">{{ props.label }}</span>
  </Link>
</template>
