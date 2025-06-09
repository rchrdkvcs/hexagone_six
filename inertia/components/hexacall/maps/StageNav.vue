<script lang="ts" setup>
import type Map from '#maps/models/map'

defineProps<{
  levels: Map['levels']
  currentLevel: number
}>()
</script>

<template>
  <div
    class="flex gap-1.5 md:bg-default/75 md:backdrop-blur md:border border-default rounded-full md:p-1.5 shadow-lg"
  >
    <UButton
      v-for="level in levels"
      :key="level.level"
      :active="level.level === currentLevel"
      :label="level.name"
      activeColor="primary"
      activeVariant="solid"
      class="rounded-full hidden md:block"
      color="neutral"
      variant="ghost"
      @click="$emit('stageChange', level.level)"
    />

    <UDropdownMenu
      class="md:hidden"
      :items="
        levels.map((level) => ({
          label: level.name,
          click: () => $emit('stageChange', level.level),
        }))
      "
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
