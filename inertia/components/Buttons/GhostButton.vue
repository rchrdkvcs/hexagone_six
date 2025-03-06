<script lang="ts" setup>
import {Link} from '@inertiajs/vue3'

const props = defineProps({
  label: String,
  href: String,
})
</script>

<template>
  <Link
    :href="props.href"
    class="relative uppercase text-white text-xl font-bold px-8 flex justify-center items-center h-full group">
    <span class="z-5">{{ props.label }}</span>
    <div class="z-0">
      <div
        class="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-[#00ffe5]/75 to-[#00ffe5]/0 group-hover:h-1/2 transition-all ease-in-out duration-300"></div>
      <div
        class="absolute bottom-0 left-0 w-full h-0 bg-[#00ffe5] group-hover:h-[5px] transition-all ease-in-out duration-300"></div>
    </div>
  </Link>
</template>
