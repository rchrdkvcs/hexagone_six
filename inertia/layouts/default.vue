<script lang="ts" setup>
import AppHeader from '~/components/utils/AppHeader.vue'
import AppFooter from '~/components/utils/AppFooter.vue'
import { provide, ref } from 'vue'

const showFooter = ref(true)
provide('showFooter', showFooter)
</script>

<template>
  <AppHeader />
  <div class="min-h-screen">
    <slot />
  </div>
  <AppFooter v-if="showFooter" />
</template>
