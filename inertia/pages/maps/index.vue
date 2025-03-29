<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import MapCard from '~/components/maps/MapCard.vue'
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'
import FilterLabel from '~/components/maps/FilterLabel.vue'

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
  const maps =
    selectedFilter.value === 'all'
      ? props.maps
      : props.maps.filter((map) =>
          map.playlists.some((playlist: Playlist) => playlist.label === selectedFilter.value)
        )

  return maps.sort((a, b) => a.name.localeCompare(b.name))
})

const toggleFilter = (filter: string) => {
  selectedFilter.value = selectedFilter.value === filter ? 'all' : filter
}
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
      <FilterLabel
        :is-selected="selectedFilter === 'all'"
        label="Voir tout"
        value="all"
        @update:filter="toggleFilter($event)"
      />

      <FilterLabel
        v-for="playlist in props.playlists"
        :key="playlist.id"
        :is-selected="selectedFilter === playlist.label"
        :label="playlist.label"
        :value="playlist.label"
        @update:filter="toggleFilter($event)"
      />
    </div>
  </div>

  <TransitionGroup
    class="flex flex-wrap w-full gap-4 justify-center items-center"
    name="map-list"
    tag="div"
  >
    <MapCard
      v-for="map in filteredMaps"
      :key="map.id"
      :href="`/cartes/${map.slug}`"
      :image-src="`/images/maps/${map.slug}/thumbnail.jpg`"
      :name="map.name"
    />
  </TransitionGroup>
</template>

<style scoped>
.map-list-move {
  transition: transform 0.5s ease;
}

.map-list-enter-active,
.map-list-leave-active {
  transition: all 0.5s ease;
}

.map-list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

.map-list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.map-list-leave-active {
  position: absolute;
  z-index: 0;
}

.map-list-enter-active {
  z-index: 1;
}

.flex {
  position: relative;
}
</style>
