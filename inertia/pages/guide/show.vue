<script setup lang="ts">
import GuideToc from '~/components/guide/GuideToc.vue'
import GuidePaywall from '~/components/guide/GuidePaywall.vue'
import type Guide from '#guides/models/guide'

interface Props {
  guide: Guide & {
    htmlContent: string
    toc: string
  }
  access: {
    hasAccess: boolean
    isFree: boolean
    isPaid: boolean
    truncated: boolean
    price: number
    priceFormatted: string
    contentToShow?: string
  }
  stats?: {
    totalPurchases: number
    revenue: number
  }
  user?: {
    id: string
    email: string
  } | null
  justPurchased?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <section class="relative bg-default py-8 min-h-screen">
    <!-- Notification de succès d'achat avec UAlert -->
    <div v-if="props.justPurchased && props.access.hasAccess" class="max-w-7xl mx-auto px-4 mb-6">
      <UAlert
        variant="soft"
        color="success"
        title="🎉 Félicitations !"
        description="Vous avez maintenant accès au guide complet !"
        icon="lucide:check-circle"
      />
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_768px_1fr] 2xl:grid-cols-[1fr_896px_1fr] gap-8 p-4 lg:p-0"
    >
      <!-- Sidebar gauche avec info du guide -->
      <div class="lg:p-4 space-y-4">
        <img :src="guide.thumbnailUrl" :alt="guide.title" class="w-full h-auto rounded-lg" />

        <div class="guide-meta">
          <p class="text-muted">Guide réalisé par {{ guide.author }}</p>

          <!-- Indicateur de statut d'accès avec UBadge -->
          <div class="mt-4">
            <UBadge v-if="access.isFree" variant="soft" size="lg" color="success">
              <UIcon name="lucide:unlock" class="w-4 h-4 mr-2" />
              Guide gratuit
            </UBadge>

            <UBadge v-else-if="access.hasAccess" color="secondary" variant="soft" size="lg">
              <UIcon name="lucide:check-circle" class="w-4 h-4 mr-2" />
              Acheté
            </UBadge>

            <UBadge v-else color="warning" variant="soft" size="lg">
              <UIcon name="lucide:lock" class="w-4 h-4 mr-2" />
              Premium - {{ access.priceFormatted }}€
            </UBadge>
          </div>

          <!-- Statistiques (si disponibles) -->
          <div v-if="stats && (access.hasAccess || access.isFree)" class="mt-4 text-sm text-muted">
            <div class="stats-item">
              <UIcon name="lucide:users" class="w-4 h-4" />
              <span>{{ stats.totalPurchases }} achat{{ stats.totalPurchases > 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="relative">
        <!-- Contenu du guide avec effet de fade si tronqué -->
        <div v-if="access.truncated" class="relative overflow-hidden">
          <!-- Contenu tronqué -->
          <article v-html="guide.htmlContent" class="markdown-content relative z-0" />

          <!-- Gradient overlay pour l'effet de fondu -->
          <div
            class="absolute inset-x-0 bottom-0 h-64 backdrop-blur-[2px] bg-gradient-to-t from-default to-transparent z-10 pointer-events-none"
            style="
              -webkit-mask-image: linear-gradient(to top, black 15%, transparent 100%);
              mask-image: linear-gradient(to top, black 15%, transparent 100%);
            "
          />
        </div>

        <!-- Contenu complet si pas tronqué -->
        <article v-else v-html="guide.htmlContent" class="markdown-content" />

        <!-- Composant de paywall -->
        <GuidePaywall v-if="access.truncated" :guide="guide" :access="access" :user="user" />
      </div>

      <!-- Table des matières -->
      <div class="lg:p-4">
        <GuideToc :toc="guide.toc" class="z-0" />

        <!-- Actions rapides -->
        <div v-if="!access.truncated" class="mt-6 space-y-2">
          <UButton variant="ghost" size="sm" to="/guide" class="w-full">
            <UIcon name="lucide:arrow-left" class="w-4 h-4" />
            Retour aux guides
          </UButton>

          <UButton
            v-if="access.hasAccess && !access.isFree"
            variant="ghost"
            size="sm"
            color="gray"
            class="w-full"
            disabled
          >
            <UIcon name="lucide:heart" class="w-4 h-4" />
            Merci pour votre achat !
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@import '../../assets/styles/markdown.css';

/* Seuls les styles markdown sont nécessaires - tout le reste utilise Tailwind et Nuxt UI */
.stats-item {
  @apply flex items-center gap-2;
}
</style>
