<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { useUser } from '~/composables/use_user'
import Maps from '~/layouts/maps.vue'
import MarkerModal from '~/components/hexacall/maps/MarkerModal.vue'
import PolygoneModal from '~/components/hexacall/maps/PolygoneModal.vue'
import MapLeaflet from '~/components/hexacall/maps/MapLeaflet.vue'
import StageNav from '~/components/hexacall/maps/StageNav.vue'

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
const currentLevel = ref(props.map.levels.find((level) => level.isDefault)?.level as number)

const imageUrl = computed(() => `/images/maps/${props.map.slug}/${currentLevel.value}.jpg`)

const markers = computed(() => {
  return props.map.markers.filter((marker) => marker.stage === currentLevel.value)
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
    label: 'Marqueur',
    icon: 'lucide:map-pin',
    onClick: () => {
      if (user.value) {
        editMode.value = 'marker'
      } else {
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
    },
  },
  {
    label: 'Zone',
    icon: 'lucide:hexagon',
    onClick: () => {
      if (user.value) {
        editMode.value = 'polygon'
        newPolygone.value = null
      } else {
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
      markerModal.open({ event, map, stage: currentLevel.value })
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
      stage: currentLevel.value,
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
  console.log('handleStageChange', stage)
  currentLevel.value = stage
  newPolygone.value = null
}
</script>

<template>
  <Head :title="map.name" />

  <MapLeaflet
    :key="currentLevel"
    :markers="markers"
    :polygones-preview="newPolygone"
    :show-label="showLabel"
    :image-url="imageUrl"
    :edit-mode="editMode"
    @mapClick="handelMapClick"
  />

  <div
    v-if="!editMode"
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
  >
    <StageNav
      :currentLevel="currentLevel"
      :levels="props.map.levels"
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
      :label="`Quitter le mode ${editMode === 'marker' ? 'marqueur' : 'zone'}`"
      icon="lucide:x"
      class="rounded-full backdrop-blur-lg"
      variant="subtle"
      size="xl"
      @click="
        () => {
          editMode = null
          newPolygone = null
        }
      "
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
        v-if="editMode === 'polygon' && newPolygone && newPolygone.coordinates.length > 2"
        icon="lucide:check"
        class="rounded-full backdrop-blur-lg"
        size="xl"
        @click="handlePolygoneModal"
      />

      <template #content>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">Mode édition</h3>
          <p class="text-sm text-default/80 mb-4">
            Sélectionnez un type de marqueur ou de zone pour commencer à ajouter des éléments sur la
            carte.
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Marqueurs : Ajoutez des points d'intérêt sur la carte.</li>
            <li>Zones : Définissez des zones spécifiques sur la carte.</li>
          </ul>
        </div>
      </template>
    </UPopover>
  </div>
</template>
