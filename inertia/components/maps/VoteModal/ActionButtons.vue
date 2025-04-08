<script lang="ts" setup>
defineProps<{
  showAllSuggestions: boolean
  hasSuggestions: boolean
}>()

const emit = defineEmits(['view-all', 'add-suggestion'])
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <button
      v-if="!showAllSuggestions && hasSuggestions"
      class="py-2 px-3 bg-#24262A/50 border border-white/15 rounded-xl flex items-center gap-2 justify-center w-full color-white/80 hover:(bg-white color-black) transition-colors duration-300"
      @click="$emit('view-all')"
    >
      <i class="i-mdi:format-list-bulleted size-6" />
      <span>Voir toutes les suggestions</span>
    </button>

    <button
      class="py-2 px-3 bg-white/15 border border-white/15 rounded-xl flex items-center gap-2 justify-center w-full color-white hover:(bg-white color-black) transition-colors duration-300"
      @click="$emit('add-suggestion')"
    >
      <i class="i-mdi:add size-6" />
      <span>Faire une suggestion</span>
    </button>
  </div>
</template>
