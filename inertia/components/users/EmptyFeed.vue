<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-8 text-center">
    <UIcon v-if="icon" :name="icon" class="size-12" />
    <div class="space-y-2">
      <h3 class="text-lg font-medium">{{ title }}</h3>
      <p class="text-sm text-muted max-w-md">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
