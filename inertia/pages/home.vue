<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import HomeHero from '~/components/home/HomeHero.vue'
import HomeFeatures from '~/components/home/HomeFeatures.vue'
import HomeFaq from '~/components/home/HomeFaq.vue'
import HomeCta from '~/components/home/HomeCta.vue'
</script>

<template>
  <Head title="Apprendre les callouts de Rainbow Six Siege en français" />

  <div class="space-y-8 md:space-y-24">
    <HomeHero />
    <HomeFeatures />
    <HomeFaq />
    <HomeCta />
  </div>
</template>
