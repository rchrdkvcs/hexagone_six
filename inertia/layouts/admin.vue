<script lang="ts" setup>
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
</script>

<template>
  <UApp>
    <div class="grid grid-cols-[256px_1fr] h-screen">
      <AdminSidebar />
      <slot />
    </div>
  </UApp>
</template>
