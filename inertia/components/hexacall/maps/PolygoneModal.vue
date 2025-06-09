<script lang="ts" setup>
import axios from 'axios'
import { useUser } from '~/composables/use_user'

import type Map from '#maps/models/map'
import { ref } from 'vue'

const props = defineProps<{
  map: Map
  coordinates: { x: number; y: number }[]
  stage: number
}>()

const emit = defineEmits(['close'])

const user = useUser()
const toast = useToast()

const label = ref('')

const handlePolygoneSubmit = async () => {
  try {
    const response = await axios.post('/markers', {
      mapId: props.map.id,
      userId: user.value?.id,
      label: label.value,
      type: 'polygone',
      stage: props.stage,
      coordinates: props.coordinates,
    })

    props.map.markers.push(response.data.marker)

    toast.add({
      title: 'Point proposé',
      description: 'Votre proposition de point a été ajoutée.',
      icon: 'lucide:check',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Erreur lors de la proposition',
      description: "Une erreur est survenue lors de l'ajout de votre proposition.",
      icon: 'lucide:x',
      color: 'error',
    })
  } finally {
    label.value = ''
    emit('close')
  }
}
</script>

<template>
  <UModal title="Ajouter une zone" description="">
    <template #header>
      <h2 class="text-lg font-semibold">Ajouter une zone</h2>
    </template>

    <template #body>
      <form id="newPolygoneForm" @submit.prevent="handlePolygoneSubmit">
        <UFormField label="Nom de la zone" required>
          <UInput v-model="label" class="w-full" placeholder="Armurerie" type="text" />
        </UFormField>
      </form>
    </template>

    <template #footer>
      <div class="ml-auto space-x-2">
        <UButton color="error" variant="ghost" @click="emit('close')">Annuler</UButton>
        <UButton color="neutral" form="newPolygoneForm" type="submit">Enregistrer</UButton>
      </div>
    </template>
  </UModal>
</template>
