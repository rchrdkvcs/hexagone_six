<script lang="ts" setup>
defineProps<{
  stages: number
  currentStage: number
}>()
</script>

<template>
  <div
    class="flex gap-1.5 bg-default/75 backdrop-blur border border-default rounded-full p-1.5 shadow-lg"
  >
    <UButton
      v-for="index in stages"
      :key="index"
      :active="index === currentStage"
      :label="`Etage ${index}`"
      activeColor="primary"
      activeVariant="solid"
      class="rounded-full"
      color="neutral"
      variant="ghost"
      @click="$emit('stageChange', index)"
    />
  </div>
</template>
