<script lang="ts" setup>
import type Vote from '#votes/models/vote'

defineProps<{
  votes: Vote[]
}>()

// const columns: TableColumn<Vote>[] = []
</script>

<template>
  <div class="size-full p-6 flex flex-col gap-4">
    <h1>En construction</h1>
    <!--    <div class="flex justify-between items-center">-->
    <!--      <h1 class="text-2xl font-bold">Utilisateurs</h1>-->
    <!--      <span class="text-lg font-semibold">{{ users.length }}</span>-->
    <!--    </div>-->
    <!--    <UTable :data="users" :columns="columns" class="bg-muted rounded-lg w-full" />-->
  </div>
</template>
