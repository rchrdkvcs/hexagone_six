<script lang="ts" setup>
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
</script>

<template>
  <UApp>
    <div class="grid grid-cols-[256px_1fr] h-screen bg-default">
      <AdminSidebar />
      <main class="size-full overflow-x-scroll">
        <slot />
      </main>
    </div>
  </UApp>
</template>
