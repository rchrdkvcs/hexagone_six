<script lang="ts" setup>
import { computed, ref } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import axios from 'axios'
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
  try {
    const suggestion = await axios.post('/markers/suggestions', {
      markerId: props.marker.id,
      label: suggest.value,
    })

    suggestions.value.push(suggestion.data)

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

const handleVote = async (suggestion: Suggestion, voteType: 'up' | 'down') => {
  const voteProperty = voteType === 'up' ? 'upVote' : 'downVote'

  suggestion[voteProperty] += 1
  suggestion.voteRatio = suggestion.upVote - suggestion.downVote

  try {
    await axios.patch(`/markers/suggestions/${suggestion.id}`, {
      [voteProperty]: suggestion[voteProperty],
    })

    toast.add({
      title: 'Vote enregistré',
      description: 'Merci pour votre participation !',
      icon: 'lucide:check',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: error.response?.data?.message || 'Une erreur est survenue lors du vote.',
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
    :title="marker.label"
    class="z-50 bg-default/75 backdrop-blur-md"
  >
    <template #body>
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
