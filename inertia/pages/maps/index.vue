<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import MapCard from '~/components/MapCard.vue'
import { MapData, mapsData } from '~/data/maps'
import { computed, ref } from 'vue'

const selectedFilter = ref<'all' | 'Casual' | 'Classé' | 'Non classé'>('all')

// Filtrage des cartes
const filteredMaps = computed<MapData[]>(() => {
  if (selectedFilter.value === 'all') {
    return mapsData
  }

  return mapsData.filter((map) => map.playlist.includes(selectedFilter.value))
})
</script>

<template>
  <Head title="Cartes" />

  <div class="my-16 flex flex-col justify-center items-center gap-8">
    <div class="flex flex-col justify-center items-center gap-4">
      <h1 class="text-6xl md:text-7xl uppercase italic">Cartes</h1>
      <h3 class="font-sans max-w-4/5 text-center">
        Vous êtes nouveau dans le jeu, ou vous avez encore du mal à apprendre les cartes et à savoir
        où concentrer votre attention ? Consultez ces guides de cartes pour vous aider à faire vos
        premiers pas dans Rainbow Six Siege !
      </h3>
    </div>

    <h2 class="md:text-4xl text-5xl uppercase italic text-center">
      OPÉRATION PREP PHASE - FILTRES DE PLAYLISTES
    </h2>

    <div class="flex justify-center items-center gap-4">
      <label
        :class="{ 'bg-white/75 text-black': selectedFilter === 'all' }"
        class="relative uppercase text-sm px-2 py-1 flex justify-center items-center border border-white hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer"
      >
        <input v-model="selectedFilter" class="hidden" type="radio" value="all" />
        Voir tout
      </label>
      <label
        :class="{ 'bg-white/75 text-black': selectedFilter === 'Casual' }"
        class="relative uppercase text-sm px-2 py-1 flex justify-center items-center border border-white hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer"
      >
        <input v-model="selectedFilter" class="hidden" type="radio" value="Casual" />
        Simple
      </label>
      <label
        :class="{ 'bg-white/75 text-black': selectedFilter === 'Non classé' }"
        class="relative uppercase text-sm px-2 py-1 flex justify-center items-center border border-white hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer"
      >
        <input v-model="selectedFilter" class="hidden" type="radio" value="Non classé" />
        Non classé
      </label>
      <label
        :class="{ 'bg-white/75 text-black': selectedFilter === 'Classé' }"
        class="relative uppercase text-sm px-2 py-1 flex justify-center items-center border border-white hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer"
      >
        <input v-model="selectedFilter" class="hidden" type="radio" value="Classé" />
        Classé
      </label>
    </div>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 md:mx-8 lg:mx-16 xl:mx-24"
  >
    <MapCard
      v-for="map in filteredMaps"
      :href="`/cartes/${map.id}`"
      :image-src="`/images/maps/${map.id}/thumbnail.jpg`"
      :name="map.name"
    />
  </div>
</template>
