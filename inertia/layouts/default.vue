<script lang="ts" setup>
import AppHeader from '~/components/utils/AppHeader.vue'
import AppFooter from '~/components/utils/AppFooter.vue'
</script>

<template>
  <UApp>
    <AppHeader />
    <div class="min-h-screen">
      <slot />
    </div>
    <AppFooter />
  </UApp>
</template>
