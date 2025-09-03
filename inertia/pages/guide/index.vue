<script setup lang="ts">
import { computed, ref } from 'vue'
import GuideCard from '~/components/guide/GuideCard.vue'
import type Guide from '#guides/models/guide'

interface GuideWithPurchaseStatus extends Guide {
  isPurchased: boolean
}

interface Props {
  guides: GuideWithPurchaseStatus[]
  user?: {
    id: string
    email: string
  } | null
}

const props = defineProps<Props>()

// Filtres disponibles
const filters = ref([
  { label: 'Tous', value: 'all', icon: 'lucide:list', active: true },
  { label: 'Gratuit', value: 'free', icon: 'lucide:gift', active: false },
  { label: 'Premium', value: 'premium', icon: 'lucide:crown', active: false },
  { label: 'Achetés', value: 'purchased', icon: 'lucide:check-circle', active: false },
  { label: 'Nouveau', value: 'new', icon: 'lucide:sparkles', active: false },
])

// Filtre actif
const activeFilter = ref('all')

// Fonction pour changer de filtre
const setFilter = (filterValue: string) => {
  activeFilter.value = filterValue
  filters.value.forEach((filter) => {
    filter.active = filter.value === filterValue
  })
}

// Guides filtrés
const filteredGuides = computed(() => {
  if (activeFilter.value === 'all') {
    return props.guides
  }

  return props.guides.filter((guide) => {
    switch (activeFilter.value) {
      case 'free':
        return guide.price === 0 || guide.price === null || guide.price <= 0
      case 'premium':
        return guide.price > 0
      case 'purchased':
        return guide.isPurchased
      case 'new':
        return (
          guide.publishedAt &&
          new Date(guide.publishedAt as unknown as string) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      default:
        return true
    }
  })
})
</script>

<template>
  <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
    <div class="space-y-2 px-4 md:px-0 z-0">
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
      >
        Des guides pour vous aider à progresser, fait par des experts.
      </h2>

      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Découvrez nos articles et guides pour améliorer vos compétences, comprendre les mécaniques
        du jeu et rester à jour avec les dernières stratégies.
      </p>
    </div>

    <!-- Filtres -->
    <div class="flex flex-wrap gap-3 justify-center px-4 md:px-0">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="setFilter(filter.value)"
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
          filter.active
            ? 'bg-primary text-inverted shadow-lg scale-105'
            : 'bg-muted text-muted hover:bg-accented hover:text-default hover:scale-105',
        ]"
        :disabled="filter.value === 'purchased' && !user"
      >
        <UIcon :name="filter.icon" class="w-4 h-4" />
        <span>{{ filter.label }}</span>
      </button>
    </div>

    <!-- Résultats -->
    <div v-if="filteredGuides.length > 0" class="flex flex-col gap-8 lg:flex-row">
      <div class="flex flex-col gap-8 lg:w-1/2">
        <template v-for="(guide, index) in filteredGuides" :key="`${guide.slug}-${index}`">
          <GuideCard v-if="index % 2 === 0" :guide="guide" :user="user" />
        </template>
      </div>
      <div class="flex flex-col gap-8 lg:w-1/2">
        <template v-for="(guide, index) in filteredGuides" :key="`${guide.slug}-${index}`">
          <GuideCard v-if="index % 2 === 1" :guide="guide" :user="user" />
        </template>
      </div>
    </div>

    <!-- Message si aucun résultat -->
    <div v-else class="text-center py-16">
      <UIcon name="lucide:search-x" class="w-16 h-16 text-muted mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-highlighted mb-2">Aucun guide trouvé</h3>
      <p class="text-muted mb-6">Aucun guide ne correspond aux filtres sélectionnés.</p>
      <UButton
        @click="setFilter('all')"
        label="Voir tous les guides"
        icon="lucide:list"
        variant="outline"
      />
    </div>
  </UContainer>
</template>
