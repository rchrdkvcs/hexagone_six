<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'

interface FonctionItem {
  title: string
  description: string
  icon: string
  link?: string
  badge?: {
    label: string
    variant: 'subtle' | 'solid' | 'outline' | 'soft'
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  }
}

const fonctionItems: FonctionItem[] = [
  {
    title: 'La LAN Hexagone 6',
    description:
      "L'événement compétitif incontournable à Paris, rassemblant le meilleur de la scène francophone.",
    icon: 'lucide:gamepad-2',
    link: '/lan',
  },
  {
    title: 'HexaCall',
    description:
      'Notre outil participatif de naming de maps, où les joueurs proposent, votent et apprennent les meilleurs calls sur toutes les cartes.',
    icon: 'lucide:map',
    link: '/hexacall',
  },
  {
    title: 'HexaBoost',
    description:
      "Service d'optimisation PC sur-mesure pour gagner en fluidité et en stabilité sur Siege X, en collaboration avec des experts techniques.",
    icon: 'lucide:settings',
    link: '/hexaboost',
  },
  {
    title: 'PC Clutch',
    description:
      'Une sélection de PC optimisés pour Rainbow Six Siege, testés et validés par les meilleurs joueurs de la communauté.',
    icon: 'lucide:computer',
    link: '/pc-clutch',
  },
  {
    title: 'Guides',
    description:
      'Des guides et tutoriels complets pour maîtriser Siege X, de la configuration optimale de votre PC aux stratégies avancées.',
    icon: 'lucide:book',
    link: '/',
    badge: {
      label: 'Bientôt Disponible',
      variant: 'subtle',
      color: 'warning',
    },
  },
  {
    title: 'Ranking',
    description:
      'Un système de classement transparent et équitable pour suivre votre progression et celle de vos amis.',
    icon: 'lucide:book',
    link: '/',
    badge: {
      label: 'Bientôt Disponible',
      variant: 'subtle',
      color: 'warning',
    },
  },
]
</script>

<template>
  <UContainer
    class="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-4 relative"
  >
    <img
      src="/public/images/logo.png"
      class="size-16 md:size-32 xl:size-48"
      alt="Logo of Hexagone Six"
    />

    <UBadge
      label="L'écosystème PC dédié à Rainbow Six Siege"
      variant="subtle"
      size="lg"
      class="rounded-full"
    />

    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">Hexagone Six</h1>
    <p class="text-base md:text-lg text-muted max-w-2xl text-center mt-4">
      La plateforme de référence pour tous les joueurs PC Rainbow Six Siege en France. Que vous
      soyez compétiteur, stratège ou joueur exigeant, vous trouverez ici les outils et événements
      pensés pour maximiser votre performance sur Siege X.
    </p>

    <ULink
      to="#ecosystem"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <span class="text-sm font-medium text-primary">Découvrir notre écosystème</span>
      <UIcon name="lucide:chevron-down" class="size-5 text-primary animate-bounce" />
    </ULink>
  </UContainer>

  <section
    class="relative bg-default border-t border-default min-h-[calc(100vh-64px)]"
    id="features"
  >
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Des fonctionnalités pensées pour la communauté
        </h2>
        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          Une plateforme collaborative développée par et pour les joueurs de Rainbow Six Siege.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 z-0">
        <Link v-for="fonction in fonctionItems" :href="fonction.link as string">
          <UCard
            class="hover:bg-muted hover:scale-102 cursor-pointer transition duration-200 ease-in-out"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="lucide:gamepad-2" class="text-primary size-6" />
                <h3 class="text-xl font-semibold">{{ fonction.title }}</h3>
                <UBadge
                  v-if="fonction.badge?.label"
                  :label="fonction.badge.label"
                  :variant="fonction.badge.variant"
                  :color="fonction.badge.color"
                />
              </div>
            </template>
            <p>
              {{ fonction.description }}
            </p>
          </UCard>
        </Link>
      </div>
    </UContainer>
  </section>

  <section class="relative bg-default border-t border-default" id="ecosystem">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Nos partenaires
        </h2>
        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          Hexagone Six est soutenu par des partenaires engagés.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 z-0">
        <ULink
          to="https://fr.weareholy.com/"
          class="flex flex-col items-center justify-center gap-2 p-6 h-[120px] bg-elevated/50 hover:bg-elevated rounded-lg ring ring-default transition duration-200 ease-in-out hover:ring-primary"
        >
          <img src="/public/images/sponsors/holy.png" alt="Holy Logo" />
          <span class="font-medium text-lg">Holy Energy</span>
        </ULink>

        <ULink
          to="https://www.msi.com/"
          class="flex flex-col items-center justify-center gap-2 p-6 h-[120px] bg-elevated/50 hover:bg-elevated rounded-lg ring ring-default transition duration-200 ease-in-out hover:ring-primary"
        >
          <div class="flex flex-col items-center gap-2">
            <img src="/public/images/sponsors/msi.png" alt="Msi Logo" />
            <span class="font-medium text-lg">MSI</span>
          </div>
        </ULink>

        <ULink
          to="https://hardwaremodding.fr/"
          class="flex flex-col items-center justify-center gap-2 p-6 h-[120px] bg-elevated/50 hover:bg-elevated rounded-lg ring ring-default transition duration-200 ease-in-out hover:ring-primary"
        >
          <div class="flex flex-col items-center gap-2">
            <img src="/public/images/sponsors/hm.png" alt="Hardware Modding Logo" />
            <span class="font-medium text-lg">Hardware Modding</span>
          </div>
        </ULink>
      </div>
    </UContainer>
  </section>
</template>
