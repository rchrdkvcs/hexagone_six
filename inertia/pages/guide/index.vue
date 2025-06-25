<script setup lang="ts">
import GuideCard from '~/components/guide/GuideCard.vue'
import type Guide from '#guides/models/guide'

defineProps<{
  guides: Guide[]
}>()
</script>

<template>
  <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
    <div class="space-y-2 px-4 md:px-0 z-0">
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
      >
        Des guides pour vous aider à progresser, fait par des experts.
      </h2>

      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Découvrez nos articles et guides pour améliorer vos compétences, comprendre les mécaniques
        du jeu et rester à jour avec les dernières stratégies.
      </p>
    </div>

    <div class="flex flex-col gap-8 lg:flex-row">
      <div class="flex flex-col gap-8 lg:w-1/2">
        <template v-for="(guide, index) in guides" :key="`${guide.slug}-${index}`">
          <GuideCard v-if="index % 2 === 0" :guide="guide" />
        </template>
      </div>
      <div class="flex flex-col gap-8 lg:w-1/2">
        <template v-for="(guide, index) in guides" :key="`${guide.slug}-${index}`">
          <GuideCard v-if="index % 2 === 1" :guide="guide" />
        </template>
      </div>
    </div>
  </UContainer>
</template>
