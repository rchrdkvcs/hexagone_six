<script lang="ts" setup>
import {Link} from "@inertiajs/vue3";

const props = defineProps({
  name: String,
  href: String,
  imageSrc: String,
});
</script>

<template>
  <Link :href="props.href"
        class="relative text-black transition-all ease-in-out duration-300 group">
    <img
      :src="props.imageSrc"
      alt="stadium"/>
    <div
      class="w-full bg-white/75 group-hover:bg-[#00ffe5] py-2 backdrop-blur-sm flex justify-center items-center transition ease-in-out duration-300">
      <p class="uppercase italic text-xl">{{ props.name }}</p>
    </div>
    <div
      class="absolute bottom-[44px] opacity-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00ffe5]/50 to-[#00ffe5]/0 group-hover:opacity-100 transition-all ease-in-out duration-300"></div>
  </Link>
</template>
