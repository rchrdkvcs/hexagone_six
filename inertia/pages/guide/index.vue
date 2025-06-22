<script setup lang="ts">
import GuideToc from '~/components/guide/GuideToc.vue'

defineProps<{
  contents: {
    html: string
    toc: string
  }
}>()
</script>

<template>
  <section class="relative bg-default py-8 md:py-16 xl:py-24">
    <UContainer class="grid grid-cols-1 md:grid-cols-[320px_768px] gap-8 w-fit mx-auto">
      <GuideToc :toc="contents.toc" class="hidden md:block z-0" />
      <div v-html="contents.html" class="markdown-content z-0" />
    </UContainer>
  </section>
</template>

<style>
@import '../../assets/styles/markdown.css';
</style>
