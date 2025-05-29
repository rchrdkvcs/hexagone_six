<script lang="ts" setup>
import { useAccess } from '~/composables/use_access'
</script>

<template>
  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-999 flex gap-2 bg-default/75 backdrop-blur border border-default rounded-full p-2 shadow-lg"
  >
    <UButton
      v-for="index in totalImages"
      :key="index"
      :active="index === currentImageIndex"
      :label="`Etage ${index}`"
      activeColor="primary"
      activeVariant="solid"
      class="rounded-full cursor-pointer font-semibold transition-all duration-200 ease-in-out"
      color="neutral"
      size="lg"
      variant="ghost"
      @click="loadImage(index)"
    />

    <UButton
      :active="showLabel"
      :icon="showLabel ? 'lucide:eye-off' : 'lucide:eye'"
      class="rounded-full cursor-pointer"
      size="lg"
      variant="ghost"
      @click="handleLabelView"
    />

    <UButton
      v-if="useAccess() >= 2"
      :active="isEditMode"
      activeColor="primary"
      activeVariant="solid"
      class="rounded-full cursor-pointer"
      icon="lucide:pencil"
      size="lg"
      variant="ghost"
      @click="toggleEditMode"
    />
  </div>
</template>

<style scoped></style>
