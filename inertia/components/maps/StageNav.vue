<script lang="ts" setup>
defineProps<{
  stages: number
  currentStage: number
}>()
</script>

<template>
  <div
    class="flex gap-1.5 md:bg-default/75 md:backdrop-blur md:border border-default rounded-full md:p-1.5 shadow-lg"
  >
    <UButton
      v-for="index in stages"
      :key="index"
      :active="index === currentStage"
      :label="`Etage ${index}`"
      activeColor="primary"
      activeVariant="solid"
      class="rounded-full hidden md:block"
      color="neutral"
      variant="ghost"
      @click="$emit('stageChange', index)"
    />

    <UDropdownMenu
      class="md:hidden"
      :items="
        [...Array(stages).keys()].map((stage) => ({
          label: `Etage ${stage + 1}`,
          onClick: () => $emit('stageChange', stage + 1),
        }))
      "
      :content="{
        align: 'start',
        side: 'bottom',
        sideOffset: 8,
      }"
      :ui="{
        content: 'w-32',
      }"
    >
      <UButton
        icon="lucide:gallery-vertical-end"
        color="neutral"
        variant="subtle"
        class="rounded-full"
        size="xl"
      />
    </UDropdownMenu>
  </div>
</template>
