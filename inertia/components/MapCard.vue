<script lang="ts" setup>
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
  <a
    :href="props.href"
    class="relative text-black transition ease-in-out duration-300 group rounded-xl overflow-hidden border border-white/15 hover:(scale-105 z-100) z-10 max-w-400px"
  >
    <img :alt="props.name" :src="props.imageSrc" />
    <div
      class="w-full bg-#24262A/50 group-hover:(bg-white color-black) py-2 backdrop-blur-md flex justify-center items-center transition ease-in-out duration-300 color-white/80"
    >
      <p class="text-xl font-medium">{{ props.name }}</p>
    </div>
  </a>
</template>
