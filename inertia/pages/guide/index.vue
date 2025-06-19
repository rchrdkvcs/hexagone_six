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
  <div class="size-full bg-default">
    <UContainer class="grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <GuideToc :toc="contents.toc" />
      <div v-html="contents.html" class="markdown-content prose dark:prose-invert" />
    </UContainer>
  </div>
</template>

<style>
@import '../../assets/styles/markdown.css';
</style>
