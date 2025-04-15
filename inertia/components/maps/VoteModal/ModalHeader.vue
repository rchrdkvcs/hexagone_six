<script lang="ts" setup>
import AppButton from '~/components/utils/AppButton.vue'

defineProps<{
  showAllSuggestions: boolean
}>()

defineEmits(['close', 'back'])
</script>

<template>
  <AppButton
    class="!w-fit absolute top-4 right-4 !p-1 z-10"
    icon="i-mdi:close"
    variant="ghost"
    @click="$emit('close')"
  />
  <AppButton
    v-if="showAllSuggestions"
    class="!w-fit absolute top-4 left-4 !p-1 z-10"
    icon="i-mdi:arrow-left"
    variant="ghost"
    @click="$emit('back')"
  />
</template>
