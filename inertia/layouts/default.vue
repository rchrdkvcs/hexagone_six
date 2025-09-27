<script lang="ts" setup>
import AppHeader from '~/components/utils/AppHeader.vue'
import AppFooter from '~/components/utils/AppFooter.vue'
</script>

<template>
  <UApp>
    <UBanner
      icon="lucide:twitch"
      title="La grande finale des #SaltyDuelsbyMSI actuellement sur Twitch - Sxnzoo vs Tamime2K."
      to="https://www.twitch.tv/sixquatre"
    />
    <AppHeader />
    <div class="min-h-screen">
      <slot />
    </div>
    <AppFooter />
  </UApp>
</template>
