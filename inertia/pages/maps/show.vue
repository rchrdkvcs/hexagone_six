<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useUser } from '~/composables/use_user'
import Maps from '~/layouts/maps.vue'
import MapLeaflet from '~/components/maps/MapLeaflet.vue'
import MarkerModal from '~/components/maps/MarkerModal.vue'
import PolygoneModal from '~/components/maps/PolygoneModal.vue'
import StageNav from '~/components/maps/StageNav.vue'

import type Map from '#maps/models/map'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { LeafletMouseEvent } from 'leaflet'

defineOptions({
  layout: Maps,
})

const props = defineProps<{
  map: Map
}>()

const user = useUser()
const currentImageIndex = ref(1)
const imageUrl = computed(() => `/images/maps/${props.map.slug}/${currentImageIndex.value}.jpg`)

const markers = computed(() => {
  return props.map.markers.filter((marker) => marker.stage === currentImageIndex.value)
})

const overlay = useOverlay()
const markerModal = overlay.create(MarkerModal)
const polygoneModal = overlay.create(PolygoneModal)
const newPolygone = ref<{
  coordinates: { x: number; y: number }[]
} | null>(null)
const showLabel = ref(true)

const editMode = ref<'marker' | 'polygon' | null>(null)

const dropDownItems = ref<DropdownMenuItem[]>([
  {
    label: 'Marqueurs',
    icon: 'lucide:map-pin',
    onClick: () => {
      editMode.value = 'marker'
    },
  },
  {
    label: 'Polygones',
    icon: 'lucide:hexagon',
    onClick: () => {
      editMode.value = 'polygon'
    },
  },
])

const handelMapClick = (event: LeafletMouseEvent) => {
  if (editMode.value && !user.value) {
    const toast = useToast()

    toast.add({
      title: 'Connexion requise',
      description: 'Vous devez être connecté pour faire une suggestion.',
      icon: 'lucide:user',
      color: 'warning',
      orientation: 'horizontal',
      actions: [
        {
          label: 'Se connecter',
          to: '/login',
          color: 'neutral',
        },
      ],
    })
  }

  if (editMode.value && user.value) {
    const { map } = props

    if (editMode.value === 'marker') {
      markerModal.open({ event, map, stage: currentImageIndex.value })
    } else if (editMode.value === 'polygon') {
      if (!newPolygone.value) {
        newPolygone.value = { coordinates: [] }
      }
      newPolygone.value.coordinates.push({ x: event.latlng.lng, y: event.latlng.lat })
    }
  }
}

const handlePolygoneModal = () => {
  if (newPolygone.value && newPolygone.value.coordinates.length > 2) {
    polygoneModal.open({
      coordinates: newPolygone.value.coordinates,
      map: props.map,
      stage: currentImageIndex.value,
    })
    newPolygone.value = null
  } else {
    const toast = useToast()
    toast.add({
      title: 'Erreur',
      description: 'Un polygone doit avoir au moins 3 points.',
      icon: 'lucide:x-circle',
      color: 'error',
    })
  }
}

const handleLabelView = () => {
  showLabel.value = !showLabel.value
}

const handleStageChange = (stage: number) => {
  currentImageIndex.value = stage
  newPolygone.value = null
}
</script>

<template>
  <Head :title="map.name" />

  <MapLeaflet
    :key="currentImageIndex"
    :markers="markers"
    :polygonesPreview="newPolygone"
    :showLabel="showLabel"
    :imageUrl="imageUrl"
    @mapClick="handelMapClick"
  />

  <div
    v-if="!editMode"
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
  >
    <StageNav
      :currentStage="currentImageIndex"
      :stages="props.map.stageCount"
      @stageChange="handleStageChange"
    />

    <UTooltip arrow text="Afficher/Masquer les étiquettes" placement="top">
      <UButton
        :active="showLabel"
        :icon="showLabel ? 'lucide:eye-off' : 'lucide:eye'"
        class="rounded-full backdrop-blur-lg"
        size="xl"
        color="neutral"
        variant="subtle"
        @click="handleLabelView"
      />
    </UTooltip>

    <UDropdownMenu
      arrow
      :items="dropDownItems"
      :ui="{
        content: 'w-48',
      }"
    >
      <UTooltip arrow text="Proposer un marqueur ou un polygone" placement="top">
        <UButton icon="lucide:plus" class="rounded-full backdrop-blur-lg" size="xl" />
      </UTooltip>
    </UDropdownMenu>
  </div>

  <div v-else class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
    <UButton
      label="Quitter le mode édition"
      icon="lucide:x"
      class="rounded-full backdrop-blur-lg"
      size="xl"
      @click="editMode = null"
    />

    <UPopover arrow>
      <UButton
        color="neutral"
        variant="subtle"
        class="rounded-full backdrop-blur-lg"
        size="xl"
        icon="lucide:circle-help"
      />

      <UButton
        icon="lucide:check"
        class="rounded-full backdrop-blur-lg"
        size="xl"
        @click="handlePolygoneModal"
      />

      <template #content>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">Mode édition</h3>
          <p class="text-sm text-default/80 mb-4">
            Sélectionnez un type de marqueur ou de polygone pour commencer à ajouter des éléments
            sur la carte.
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Marqueurs : Ajoutez des points d'intérêt sur la carte.</li>
            <li>Polygones : Définissez des zones spécifiques sur la carte.</li>
          </ul>
        </div>
      </template>
    </UPopover>
  </div>
</template>
