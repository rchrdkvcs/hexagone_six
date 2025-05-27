<script lang="ts" setup>
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import axios from 'axios'
import { useUser } from '~/composables/use_user'
import SuggestionsList from '~/components/maps/SuggestionsList.vue'

import type { TabsItem } from '@nuxt/ui'
import type MapsController from '#maps/controllers/maps_controller'
import type Suggestion from '#suggestions/models/suggestion'

type Marker = InferPageProps<MapsController, 'show'>['map']['markers']

const props = defineProps<{
  marker: Marker
}>()

const suggestions = computed(() => props.marker.suggestions)
const user = useUser()
const toast = useToast()
const suggest = ref('')

const topSuggestions = computed(() =>
  [...suggestions.value].sort((a, b) => b.voteRatio - a.voteRatio).slice(0, 10)
)

const allSuggestions = computed(() =>
  [...suggestions.value].sort((a, b) => b.voteRatio - a.voteRatio)
)

const tabItems = ref<TabsItem[]>([
  {
    label: 'Top 10',
    icon: 'lucide:star',
    slot: 'top' as const,
  },
  {
    label: 'Tous',
    icon: 'lucide:list',
    slot: 'all' as const,
  },
])

const handleSuggestionSubmit = async () => {
  const toastId = user.value?.id + props.marker.id + suggest.value

  toast.add({
    id: toastId,
    title: 'Envoi de la suggestion',
    icon: 'lucide:loader',
    color: 'neutral',
  })

  if (!user.value) {
    toast.update(toastId, {
      title: 'Connexion requise',
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
  } else {
    try {
      const response = await axios.post('/markers/suggestions', {
        markerId: props.marker.id,
        label: suggest.value,
      })

      suggestions.value.push(response.data)

      suggest.value = ''

      toast.update(toastId, {
        title: 'Suggestion ajoutée',
        description: 'Merci pour votre suggestion !',
        icon: 'lucide:check',
        color: 'success',
      })
    } catch (error) {
      toast.update(toastId, {
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'ajout de la suggestion.",
        icon: 'lucide:x',
        color: 'error',
      })
    }
  }
}

const handleVote = async (suggestion: Suggestion, voteType: 'up' | 'down') => {
  const voteProperty = voteType === 'up' ? 'upVote' : 'downVote'

  toast.add({
    id: suggestion.id,
    title: 'Enregistrement du vote',
    icon: 'lucide:loader',
    color: 'neutral',
  })

  try {
    const response = await axios.patch(`/markers/suggestions/${suggestion.id}`, {
      [voteProperty]: voteType === 'up' ? 1 : -1,
    })

    const index = suggestions.value.findIndex((s) => s.id === suggestion.id)

    if (index !== -1) {
      const updatedSuggestions = [...suggestions.value]
      updatedSuggestions[index] = response.data
      props.marker.suggestions = updatedSuggestions
    }

    toast.update(suggestion.id, {
      title: 'Vote enregistré',
      description: `Votre vote a été ${voteType === 'up' ? 'ajouté' : 'retiré'} !`,
      icon: voteType === 'up' ? 'lucide:thumbs-up' : 'lucide:thumbs-down',
      color: 'success',
    })
  } catch (error) {
    toast.update(suggestion.id, {
      title: 'Erreur',
      description: error.response?.data?.message || 'Une erreur est survenue lors du vote.',
      icon: 'lucide:x',
      color: 'warning',
    })
  }
}

const clickOnPhotoUpload = () => {
  const input = document.getElementById('markerPhoto') as HTMLInputElement

  if (input) {
    input.click()
  }
}

const handlePhotoUpload = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files?.length) return

  const toastId = `photo-${props.marker.id}-${Date.now()}`
  const formData = new FormData()
  formData.append('photo', files[0])
  formData.append('markerId', props.marker.id.toString())

  toast.add({
    id: toastId,
    title: 'Ajout de la photo',
    description: 'Veuillez patienter pendant le téléchargement de la photo.',
    icon: 'lucide:loader',
    color: 'neutral',
  })

  try {
    const response = await axios.post('/markers/photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    props.marker.imageUrls.push(response.data.imageUrl)

    toast.update(toastId, {
      title: 'Photo ajoutée',
      description: 'Votre photo a été ajoutée avec succès.',
      icon: 'lucide:check',
      color: 'success',
    })
  } catch (error) {
    toast.update(toastId, {
      title: 'Erreur',
      description:
        error.response?.data?.message || "Une erreur est survenue lors de l'ajout de la photo.",
      icon: 'lucide:x',
      color: 'error',
    })
  }
}
</script>

<template>
  <USlideover
    :dismissible="false"
    :overlay="false"
    :title="`${marker.label} (${suggestions.length})`"
    class="z-50 bg-default/75 backdrop-blur-md"
  >
    <template #body>
      <div class="w-full aspect-video mb-4 bg-muted rounded-lg">
        <div
          v-if="marker.imageUrls.length === 0"
          class="flex flex-col items-center justify-center gap-4 p-8 text-center size-full"
        >
          <UIcon class="size-8" name="lucide:camera" />
          <h3 class="text-sm font-medium">Il n'y a pas d'images pour ce marqueur</h3>
          <UButton
            class="cursor-pointer"
            color="neutral"
            icon="lucide:plus"
            label="Soumettre une image"
            variant="subtle"
            @click="clickOnPhotoUpload"
          />
        </div>

        <UCarousel
          v-else
          v-slot="{ item }"
          :items="marker.imageUrls"
          :ui="{
            viewport: 'rounded-lg',
            dots: 'bottom-3',
            dot: 'w-6 h-1',
          }"
          autoplay
          class="bg-muted rounded-lg w-full aspect-video"
          dots
        >
          <img :alt="marker.label" :src="item as string" class="w-full object-cover aspect-video" />
        </UCarousel>

        <input
          id="markerPhoto"
          accept="image/*"
          class="hidden"
          type="file"
          @change="handlePhotoUpload"
        />
      </div>

      <UTabs
        :items="tabItems"
        :ui="{
          root: 'gap-0',
          list: 'sticky top-0 z-1 p-2',
          trigger: 'cursor-pointer',
        }"
        class="w-full"
        size="sm"
      >
        <template #top>
          <SuggestionsList :suggestions="topSuggestions" @vote="handleVote" />
        </template>

        <template #all>
          <SuggestionsList :suggestions="allSuggestions" @vote="handleVote" />
        </template>
      </UTabs>
    </template>

    <template #footer>
      <div class="flex flex-col w-full gap-2">
        <form class="size-full" @submit.prevent="handleSuggestionSubmit">
          <UButtonGroup class="w-full" size="lg">
            <UInput
              v-model="suggest"
              class="w-full"
              color="neutral"
              placeholder="Faire une suggestion"
              variant="subtle"
            />
            <UButton
              class="cursor-pointer"
              color="neutral"
              icon="lucide:camera"
              variant="subtle"
              @click="clickOnPhotoUpload"
            />
            <UButton
              :disabled="suggest === ''"
              class="cursor-pointer"
              color="primary"
              icon="lucide:send"
              type="submit"
            />
          </UButtonGroup>
        </form>
      </div>
    </template>
  </USlideover>
</template>
