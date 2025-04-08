<script lang="ts" setup>
defineProps<{
  showAllSuggestions: boolean
}>()

const emit = defineEmits(['close', 'back'])
</script>

<template>
  <button
    class="absolute top-4 right-4 z-10 p-1 rounded-lg color-white/75 hover:(bg-red-600 color-white/100) transition-colors duration-300"
    @click="$emit('close')"
  >
    <i class="i-mdi:close min-size-6 size-6" />
  </button>
  <button
    v-if="showAllSuggestions"
    class="absolute top-4 left-4 z-10 p-1 rounded-lg color-white/80 hover:(bg-white color-black) transition-colors duration-300"
    @click="$emit('back')"
  >
    <i class="i-mdi:arrow-left size-6" />
  </button>
</template>
