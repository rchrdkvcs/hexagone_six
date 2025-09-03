<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import MapCard from '~/components/hexacall/maps/MapCard.vue'

import type MapsController from '#maps/controllers/maps_controller'
import type Map from '#maps/models/map'
import type Playlist from '#playlists/models/playlist'

const props = defineProps<{
  maps: InferPageProps<MapsController, 'index'>['maps']
  playlists: InferPageProps<MapsController, 'index'>['playlists']
}>()

const selectedFilter = ref<'all' | string>('all')

const filteredMaps = computed(() => {
  const maps =
    selectedFilter.value === 'all'
      ? props.maps
      : props.maps.filter((map: Map) =>
          map.playlists.some((playlist: Playlist) => playlist.label === selectedFilter.value)
        )

  return maps.sort((a: Map, b: Map) => a.name.localeCompare(b.name))
})

const toggleFilter = (filter: string) => {
  selectedFilter.value = selectedFilter.value === filter ? 'all' : filter
}
</script>

<template>
  <Head title="Liste des cartes" />

  <UContainer class="px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8">
    <div
      class="flex gap-1.5 md:bg-default/75 md:backdrop-blur md:border border-default rounded-full md:p-1.5 shadow-lg w-fit ml-auto md:mx-auto sticky top-20 z-50"
    >
      <UButton
        :active="selectedFilter === 'all'"
        label="Voir tout"
        activeColor="primary"
        activeVariant="solid"
        class="rounded-full hidden md:block"
        color="neutral"
        variant="ghost"
        @click="toggleFilter('all')"
      />

      <UButton
        v-for="playlist in playlists"
        :key="playlist.id"
        :active="selectedFilter === playlist.label"
        :label="playlist.label"
        activeColor="primary"
        activeVariant="solid"
        class="rounded-full hidden md:block"
        color="neutral"
        variant="ghost"
        @click="toggleFilter(playlist.label)"
      />

      <UDropdownMenu
        class="md:hidden"
        :items="
          playlists.map((playlist: Playlist) => ({
            label: playlist.label,
            onSelect: () => toggleFilter(playlist.label),
          }))
        "
        :ui="{
          content: 'w-32',
        }"
      >
        <UButton
          label="Filtres"
          icon="lucide:filter"
          color="neutral"
          variant="subtle"
          class="rounded-full"
        />
      </UDropdownMenu>
    </div>

    <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <MapCard
        v-for="map in filteredMaps"
        :key="map.id"
        :href="`/hexacall/cartes/${map.slug}`"
        :image-src="map.thumbnail"
        :name="map.name"
      />
    </div>
  </UContainer>
</template>
