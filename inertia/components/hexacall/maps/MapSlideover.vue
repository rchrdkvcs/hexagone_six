<script lang="ts" setup>
import type Map from '#maps/models/map'
import type Playlist from '#playlists/models/playlist'
import MapCard from '~/components/hexacall/maps/MapCard.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  maps: Map[]
  playlists: Playlist[]
}>()

defineEmits(['close'])

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
  <USlideover
    title="Liste des cartes"
    class="z-50 bg-default/75 backdrop-blur-md"
    side="left"
    :overlay="false"
  >
    <template #body>
      <div class="flex flex-wrap gap-2 py-3 justify-start items-center mb-6">
        <UBadge
          :color="selectedFilter === 'all' ? 'primary' : 'neutral'"
          :variant="selectedFilter === 'all' ? 'solid' : 'outline'"
          class="cursor-pointer rounded-full font-medium text-sm sm:text-base"
          label="Voir tout"
          value="all"
          @click="toggleFilter('all')"
        />

        <UBadge
          v-for="playlist in playlists"
          :key="playlist.id"
          :color="selectedFilter === playlist.label ? 'primary' : 'neutral'"
          :label="playlist.label"
          :value="playlist.label"
          :variant="selectedFilter === playlist.label ? 'solid' : 'outline'"
          class="cursor-pointer rounded-full font-medium text-sm sm:text-base"
          @click="toggleFilter(playlist.label)"
        />
      </div>

      <div class="flex flex-col gap-4">
        <MapCard
          v-for="map in filteredMaps"
          :key="map.id"
          :href="`/hexacall/cartes/${map.slug}`"
          :image-src="`/images/maps/${map.slug}/thumbnail.jpg`"
          :name="map.name"
          @click="$emit('close')"
        />
      </div>
    </template>
  </USlideover>
</template>
