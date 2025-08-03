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
        <div class="flex items-center justify-between gap-4 mb-4">
          <UButton
            :href="`/guides`"
            variant="ghost"
            color="neutral"
            icon="lucide:arrow-left"
            label="Retour aux guides"
          />

          <div class="flex items-center gap-2">
            <UBadge
              v-if="access.isFree"
              icon="lucide:unlock"
              label="Guide gratuit"
              variant="subtle"
              size="lg"
              color="success"
            />

            <UBadge
              v-else-if="access.hasAccess"
              icon="lucide:check-circle"
              label="Acheté"
              color="secondary"
              variant="subtle"
              size="lg"
            />

            <UBadge
              v-else
              icon="lucide:lock"
              :label="`Premium - ${access.priceFormatted}€`"
              color="warning"
              variant="subtle"
              size="lg"
            />
          </div>
        </div>

        <img :src="guide.thumbnailUrl" :alt="guide.title" class="w-full h-auto rounded-lg" />

        <div class="flex flex-col gap-2">
          <p class="text-lg">
            {{ guide.summary }}
          </p>

          <p class="text-muted">
            Guide réalisé par <span class="font-semibold">{{ guide.author }}</span>
          </p>
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
