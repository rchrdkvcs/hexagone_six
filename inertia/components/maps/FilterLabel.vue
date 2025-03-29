<script lang="ts" setup>
const props = defineProps<{
  isSelected: boolean
  label: string
  value: string
}>()

const emit = defineEmits(['update:filter'])

const updateFilter = () => emit('update:filter', props.value)
</script>

<template>
  <div
    :class="{ 'bg-white/80 text-black': isSelected }"
    class="relative uppercase text-sm px-3 py-2 flex justify-center items-center border border-white/15 hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer rounded-full bg-#24262A/50 backdrop-blur-md z-10"
    @click="updateFilter"
  >
    {{ label }}
  </div>
</template>
