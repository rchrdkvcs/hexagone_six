<script lang="ts" setup>
import AppHeader from '~/components/utils/AppHeader.vue'
</script>

<template>
  <UApp>
    <AppHeader />
    <div class="h-full w-full">
      <slot />
    </div>
  </UApp>
</template>
