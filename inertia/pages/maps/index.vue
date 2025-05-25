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

  <UContainer class="px-4 sm:px-6 md:px-8 py-6 md:py-8">
    <div class="flex flex-wrap gap-2 py-3 justify-start items-center mb-6">
      <UBadge
        :color="selectedFilter === 'all' ? 'primary' : 'neutral'"
        :variant="selectedFilter === 'all' ? 'solid' : 'outline'"
        class="cursor-pointer rounded-full font-medium text-sm sm:text-base"
        label="Voir tout"
        size="lg"
        value="all"
        @click="toggleFilter('all')"
      />

      <UBadge
        v-for="playlist in props.playlists"
        :key="playlist.id"
        :color="selectedFilter === playlist.label ? 'primary' : 'neutral'"
        :label="playlist.label"
        :value="playlist.label"
        :variant="selectedFilter === playlist.label ? 'solid' : 'outline'"
        class="cursor-pointer rounded-full font-medium text-sm sm:text-base"
        size="lg"
        @click="toggleFilter(playlist.label)"
      />
    </div>

    <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <MapCard
        v-for="map in filteredMaps"
        :key="map.id"
        :href="`/cartes/${map.slug}`"
        :image-src="`/images/maps/${map.slug}/thumbnail.jpg`"
        :name="map.name"
      />
    </div>
  </UContainer>
</template>
