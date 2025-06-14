<script setup lang="ts">
const features = [
  {
    icon: 'lucide:disc-3',
    title: 'Formatage complet & remise à zéro',
    description:
      'Tu repars sur une base saine, propre et guidée pas à pas grâce à des scripts stables et maintenus.',
  },
  {
    icon: 'lucide:cog',
    title: 'Optimisation poussée de Windows',
    description:
      'On désactive tout ce qui est inutile, allège les processus en arrière-plan, et ajuste les paramètres pour prioriser le gaming à tous les niveaux.',
  },
  {
    icon: 'lucide:cpu',
    title: 'Réglages NVIDIA ultra-précis',
    description:
      'Paramétrage avancé du panneau NVIDIA pour maximiser les performances sans perte de qualité visuelle.',
  },
  {
    icon: 'lucide:test-tube-diagonal',
    title: 'Overclocking maîtrisé (si compatible)',
    description:
      'Si ton matos le permet, on pousse CPU/GPU à leur plein potentiel — en toute sécurité. Test de stabilité inclus.',
  },
  {
    icon: 'lucide:computer',
    title: 'Vérification complète de l’intégrité système',
    description:
      'Contrôle des températures, BIOS, pilotes, stabilité générale — avant et après l’optimisation.',
  },
  {
    icon: 'lucide:message-circle-question',
    title: 'Support premium & suivi personnalisé',
    description:
      'Tu n’es jamais seul : canal prioritaire Discord, suivi post-intervention, mises à jour HexaBoost, et accompagnement continu.',
  },
]
</script>

<template>
  <section class="relative bg-default border-t border-default" id="features">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Le niveau supérieur pour ton PC
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 z-0 mx-auto md:max-w-2/3">
        <div v-for="feature in features" class="flex flex-col gap-2 justify-center items-start">
          <UIcon :name="feature.icon" class="size-6 md:size-8 lg:size-10 text-primary" />
          <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
          <p class="text-muted">{{ feature.description }}</p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped></style>
