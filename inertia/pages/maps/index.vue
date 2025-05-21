<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import MapCard from '~/components/maps/MapCard.vue'
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import type MapsController from '../../../app/maps/controllers/maps_controller'

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

  <div class="flex flex-wrap gap-2 py-3 justify-start items-center my-8 max-w-7xl mx-auto">
    <UBadge
      label="Voir tout"
      value="all"
      :color="selectedFilter === 'all' ? 'primary' : 'neutral'"
      :variant="selectedFilter === 'all' ? 'solid' : 'outline'"
      @click="toggleFilter('all')"
      class="cursor-pointer rounded-full font-medium"
      size="xl"
    />

    <UBadge
      v-for="playlist in props.playlists"
      :key="playlist.id"
      :label="playlist.label"
      :value="playlist.label"
      :color="selectedFilter === playlist.label ? 'primary' : 'neutral'"
      :variant="selectedFilter === playlist.label ? 'solid' : 'outline'"
      @click="toggleFilter(playlist.label)"
      class="cursor-pointer rounded-full font-medium"
      size="xl"
    />
  </div>

  <div class="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <MapCard
      v-for="map in filteredMaps"
      :key="map.id"
      :href="`/cartes/${map.slug}`"
      :image-src="`/images/maps/${map.slug}/thumbnail.jpg`"
      :name="map.name"
    />
  </div>
</template>
