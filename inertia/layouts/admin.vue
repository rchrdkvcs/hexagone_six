<script lang="ts" setup>
import AdminSidebar from '~/components/AdminSidebar.vue'
</script>

<template>
  <div class="grid grid-cols-[256px_1fr] h-screen">
    <AdminSidebar />
    <slot />
  </div>
</template>
