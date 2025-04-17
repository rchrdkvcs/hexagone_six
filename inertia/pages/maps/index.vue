<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import MapCard from '~/components/maps/MapCard.vue'
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'
import AppButton from '~/components/utils/AppButton.vue'

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
  <Head title="Liste des cartes" />

  <div class="flex flex-wrap gap-2 py-3 justify-center items-center my-8 mt-24 max-w-3xl mx-auto">
    <AppButton
      :active="selectedFilter === 'all'"
      label="Voir tout"
      value="all"
      variant="tag"
      @click="toggleFilter('all')"
    />

    <AppButton
      v-for="playlist in props.playlists"
      :key="playlist.id"
      :active="selectedFilter === playlist.label"
      :label="playlist.label"
      :value="playlist.label"
      variant="tag"
      @click="toggleFilter(playlist.label)"
    />
  </div>

  <TransitionGroup
    class="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
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
