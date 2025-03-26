<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import MapCard from '~/components/MapCard.vue'
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'

interface Playlist {
  id: string
  label: string
}

const props = defineProps<{
  maps: InferPageProps<MapsController, 'index'>['maps']
  playlists: InferPageProps<MapsController, 'index'>['playlists']
}>()

const selectedFilter = ref<'all' | string>('all')

const filteredMaps = computed(() => {
  if (selectedFilter.value === 'all') {
    return props.maps
  }

  return props.maps.filter((map) =>
    map.playlists.some((playlist: Playlist) => playlist.label === selectedFilter.value)
  )
})
</script>

<template>
  <Head title="Cartes" />

  <div class="my-16 flex flex-col justify-center items-center gap-8">
    <div class="flex flex-col justify-center items-center gap-4">
      <h1 class="text-5xl md:text-6xl uppercase italic font-semibold">Cartes</h1>
      <h3 class="font-sans max-w-4/5 text-center">
        Vous êtes nouveau dans le jeu, ou vous avez encore du mal à apprendre les cartes et à savoir
        où concentrer votre attention ? Consultez ces guides de cartes pour vous aider à faire vos
        premiers pas dans Rainbow Six Siege !
      </h3>
    </div>

    <h2 class="text-xl uppercase italic text-center">
      OPÉRATION PREP PHASE - FILTRES DE PLAYLISTES
    </h2>

    <div class="flex justify-center items-center gap-4">
      <label
        :class="{ 'bg-white/80 text-black': selectedFilter === 'all' }"
        class="relative uppercase text-sm px-3 py-2 flex justify-center items-center border border-white/15 hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer rounded-full bg-#24262A/50 backdrop-blur-md z-10"
      >
        <input v-model="selectedFilter" class="hidden" type="radio" value="all" />
        Voir tout
      </label>
      <label
        v-for="playlist in props.playlists"
        :key="playlist.id"
        :class="{ 'bg-white/80 text-black': selectedFilter === playlist.label }"
        class="relative uppercase text-sm px-3 py-2 flex justify-center items-center border border-white/15 hover:(bg-white text-black) transition duration-300 ease-in-out w-fit h-fit font-roboto cursor-pointer rounded-full bg-#24262A/50 backdrop-blur-md z-10"
      >
        <input v-model="selectedFilter" :value="playlist.label" class="hidden" type="radio" />
        {{ playlist.label }}
      </label>
    </div>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 md:mx-8 lg:mx-16 xl:mx-24"
  >
    <MapCard
      v-for="map in filteredMaps"
      :href="`/cartes/${map.slug}`"
      :image-src="`/images/maps/${map.slug}/thumbnail.jpg`"
      :name="map.name"
    />
  </div>
</template>
