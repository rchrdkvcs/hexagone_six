<script setup lang="ts">
import GuideToc from '~/components/guide/GuideToc.vue'
import type Guide from '#guides/models/guide'

defineProps<{
  guide: Guide
}>()
</script>

<template>
  <section class="relative bg-default py-8 min-h-screen">
    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_768px_1fr] 2xl:grid-cols-[1fr_896px_1fr] gap-8 p-4 lg:p-0"
    >
      <div class="lg:p-4 space-y-4">
        <img :src="guide.thumbnailUrl" :alt="guide.title" class="w-full h-auto rounded-lg" />
        <p class="text-muted">Guide réalisé par {{ guide.author }}</p>
      </div>
      <article v-html="guide.htmlContent" class="markdown-content z-0" />
      <GuideToc :toc="guide.toc" class="z-0" />
    </div>
  </section>
</template>

<style>
@import '../../assets/styles/markdown.css';
</style>
