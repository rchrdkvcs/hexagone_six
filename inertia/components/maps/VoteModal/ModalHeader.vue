<script lang="ts" setup>
import BackIcone from '~/components/Icones/BackIcone.vue'
import Close2Icon from '~/components/Icones/Close2Icon.vue'

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
    <Close2Icon class="w-5 h-5" />
  </button>
  <button
    v-if="showAllSuggestions"
    class="absolute top-4 left-4 z-10 p-1 rounded-lg color-white/80 hover:(bg-white color-black) transition-colors duration-300"
    @click="$emit('back')"
  >
    <BackIcone class="w-5 h-5" />
  </button>
</template>
