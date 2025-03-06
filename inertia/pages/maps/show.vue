<script lang="ts" setup>
import {Head} from "@inertiajs/vue3";

const props = defineProps<{
  name: string;
}>()
</script>

<template>
  <Head title="Cartes"/>

  <div class="my-16 flex flex-col justify-center items-center gap-8">
    <h1 class="text-7xl uppercase italic">{{ props.name }}</h1>
    <img :src="'/inertia/assets/images/maps/'+ props.name +'/thumbnail.jpg'" alt="map"/>
  </div>
</template>
