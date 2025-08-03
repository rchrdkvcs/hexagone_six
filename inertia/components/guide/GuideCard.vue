<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import type Guide from '#guides/models/guide'

interface GuideWithPurchaseStatus extends Guide {
  isPurchased: boolean
}

interface Props {
  guide: GuideWithPurchaseStatus
  user?: {
    id: string
    email: string
  } | null
}

const props = defineProps<Props>()

// Calcul du statut et du badge à afficher
const badgeInfo = computed(() => {
  const isFree = props.guide.price === 0 || props.guide.price === null || props.guide.price <= 0

  if (isFree) {
    return {
      label: 'Gratuit',
      color: 'success' as const,
      variant: 'soft' as const,
      icon: 'lucide:gift',
    }
  }

  if (props.guide.isPurchased) {
    return {
      label: 'Acheté',
      color: 'primary' as const,
      variant: 'solid' as const,
      icon: 'lucide:check-circle',
    }
  }

  return {
    label: 'Premium',
    color: 'warning' as const,
    variant: 'soft' as const,
    icon: 'lucide:crown',
  }
})

// Vérifier si le guide est nouveau (publié dans les 7 derniers jours)
const isNew = computed(() => {
  if (!props.guide.publishedAt) return false
  const publishDate = new Date(props.guide.publishedAt as unknown as string)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return publishDate >= weekAgo
})
</script>

<template>
  <Link
    :href="`/guide/${guide.slug}`"
    class="w-full h-fit bg-muted ring ring-default rounded-lg flex overflow-hidden group transition duration-200 ease-in-out hover:bg-accented/50 hover:shadow-lg relative backdrop-blur-lg"
  >
    <!-- Badge "Nouveau" -->
    <UBadge
      v-if="isNew"
      label="Nouveau"
      variant="solid"
      color="secondary"
      icon="lucide:sparkles"
      class="absolute top-2 left-2 z-10"
    />

    <!-- Image du guide -->
    <img
      v-if="guide.thumbnailUrl"
      :src="guide.thumbnailUrl"
      :alt="guide.title"
      class="object-cover h-full w-full max-w-1/3 [mask-image:linear-gradient(to_right,black_40%,transparent_95%)] group-hover:scale-105 transition duration-400 ease-in-out"
    />

    <!-- Contenu -->
    <div class="flex flex-col gap-2 w-full p-4 pl-0">
      <div class="flex flex-col gap-1">
        <h3 class="text-lg font-semibold line-clamp-1">{{ guide.title }}</h3>
        <p class="text-muted line-clamp-3">{{ guide.summary }}</p>
      </div>

      <!-- Footer avec auteur et badge statut -->
      <div class="flex items-center justify-between mt-auto border-t border-default pt-4">
        <span class="text-xs text-muted flex items-center gap-1">
          <UIcon name="lucide:user" class="w-3 h-3" />
          {{ guide.author }}
        </span>

        <div class="flex items-center gap-2">
          <!-- Badge principal (statut) -->
          <UBadge
            :label="badgeInfo.label"
            :color="badgeInfo.color"
            :variant="badgeInfo.variant"
            :icon="badgeInfo.icon"
            class="flex items-center gap-1"
          />

          <!-- Prix affiché uniquement si premium et pas acheté -->
          <div v-if="!badgeInfo.label.includes('Gratuit') && !guide.isPurchased" class="text-right">
            <span class="text-sm font-semibold text-primary">{{ guide.price }}€</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
</template>
