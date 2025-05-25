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
  const user = useUser()

  if (!user.value) {
    toast.add({
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

      toast.add({
        title: 'Suggestion ajoutée',
        description: 'Merci pour votre suggestion !',
        icon: 'lucide:check',
        color: 'success',
      })
    } catch (error) {
      toast.add({
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

    const updatedSuggestion = { ...suggestion, ...response.data }

    const index = suggestions.value.findIndex((s: Suggestion) => s.id === suggestion.id)
    if (index !== -1) {
      suggestions.value[index] = updatedSuggestion
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
</script>

<template>
  <USlideover
    :dismissible="false"
    :overlay="false"
    :title="marker.label"
    class="z-50 bg-default/75 backdrop-blur-md"
  >
    <template #body>
      <div
        class="w-full aspect-video bg-muted ring ring-muted rounded-lg mb-4 flex items-center justify-center"
      >
        <p class="font-medium text-muted text-xl">Photos placeholder</p>
      </div>

      <UTabs
        :items="tabItems"
        :ui="{
          root: 'gap-0',
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
      <UButtonGroup class="w-full" size="lg">
        <UInput
          v-model="suggest"
          class="w-full"
          color="neutral"
          placeholder="Faire une suggestion"
          variant="subtle"
        />
        <UButton
          :disabled="suggest === ''"
          class="cursor-pointer"
          color="primary"
          icon="lucide:send"
          @click="handleSuggestionSubmit"
        />
      </UButtonGroup>
    </template>
  </USlideover>
</template>
