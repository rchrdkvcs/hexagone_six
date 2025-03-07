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
    class="relative uppercase text-white text-sm px-2 py-1 flex justify-center items-center border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out w-fit h-fit font-roboto"
  >
    {{ props.label }}
  </Link>
</template>
