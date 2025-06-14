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
  <UContainer
    class="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-4 relative"
  >
    <UBadge
      label="Par Snite et HardwareModding"
      variant="subtle"
      color="neutral"
      size="lg"
      class="rounded-full md:hidden"
    />
    <UBadge
      label="Par Snite et HardwareModding – En partenariat avec Hexagone 6"
      variant="subtle"
      color="neutral"
      size="xl"
      class="rounded-full hidden md:flex"
    />

    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">HexaBoost</h1>
    <p class="text-base md:text-lg text-muted max-w-2xl md:text-center mt-4">
      HexaBoost, c’est une optimisation complète de ton système, pensée par des experts techniques,
      et ajustée pour les exigences des joueurs compétitifs, avec une attention particulière portée
      à Rainbow Six Siege X
    </p>
    <p class="text-base md:text-lg text-muted max-w-2xl md:text-center mt-4">
      Pas de logiciel miracle, pas de promesses douteuses :
      <b>juste une intervention sérieuse, calibrée, et stable</b>, réalisée par des techniciens
      reconnus.
    </p>
    <UAlert
      class="mt-4 bg-default w-fit"
      color="success"
      variant="subtle"
      icon="lucide:check-circle"
      title="Offre de lancement exclusive"
      description="Profitez d'une reduction de 10% pour une duree limiter !"
      :ui="{
        icon: 'size-11',
      }"
    />

    <ULink
      to="#features"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <span class="text-sm font-medium text-primary">Découvrir HexaBoost</span>
      <UIcon name="lucide:chevron-down" class="size-5 text-primary animate-bounce" />
    </ULink>
  </UContainer>

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

  <section class="relative bg-default border-t border-default">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Pourquoi HexaBoost est différent ?
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 z-0">
        <div class="p-4 bg-muted ring ring-default rounded-lg">
          <p class="text-lg">
            C’est le setup exact utilisé par <b>Sixquatre</b> sur <b>Siege X</b>
          </p>
        </div>

        <div class="p-4 bg-muted ring ring-default rounded-lg">
          <p class="text-lg">
            C’est pensé pour des machines de <b>joueurs compétitifs</b>, pas une optimisation
            “généraliste”
          </p>
        </div>

        <div class="p-4 bg-muted ring ring-default rounded-lg">
          <p class="text-lg">
            C’est fait à la <b>main, avec sérieux, par des techniciens</b> avec +20 ans de pratique
            réelle
          </p>
        </div>
      </div>
    </UContainer>
  </section>

  <section class="relative bg-default border-t border-default">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Comment ça se passe ?
        </h2>
      </div>

      <div class="z-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ol class="relative border-s-2 border-muted">
          <li class="mb-10 ms-6">
            <span
              class="absolute flex items-center justify-center size-8 bg-muted ring ring-default rounded-md -start-4 font-semibold text-lg"
            >
              1
            </span>
            <h3 class="flex items-center text-lg font-semibold">Tu ouvres un ticket via Discord</h3>
            <p class="text-muted">Premier contact simple et rapide avec notre équipe technique</p>
          </li>
          <li class="mb-10 ms-6">
            <span
              class="absolute flex items-center justify-center size-8 bg-muted ring ring-default rounded-md -start-4 font-semibold text-lg"
            >
              2
            </span>
            <h3 class="flex items-center text-lg font-semibold">
              On t'aide à créer ta clé USB bootable
            </h3>
            <p class="text-muted">Assistance pas à pas pour préparer ton installation</p>
          </li>
          <li class="mb-10 ms-6">
            <span
              class="absolute flex items-center justify-center size-8 bg-muted ring ring-default rounded-md -start-4 font-semibold text-lg"
            >
              3
            </span>
            <h3 class="flex items-center text-lg font-semibold">Formatage guidé étape par étape</h3>
            <p class="text-muted">
              Installation propre de Windows avec nos recommandations optimales
            </p>
          </li>
          <li class="mb-10 ms-6">
            <span
              class="absolute flex items-center justify-center size-8 bg-muted ring ring-default rounded-md -start-4 font-semibold text-lg"
            >
              4
            </span>
            <h3 class="flex items-center text-lg font-semibold">
              Optimisation HexaBoost + overclocking sécurisé
            </h3>
            <p class="text-muted">
              Configuration experte adaptée à ton matériel (overclocking si éligible)
            </p>
          </li>
          <li class="mb-10 ms-6">
            <span
              class="absolute flex items-center justify-center size-8 bg-muted ring ring-default rounded-md -start-4 font-semibold text-lg"
            >
              5
            </span>
            <h3 class="flex items-center text-lg font-semibold">
              Test de stabilité & vérification finale
            </h3>
            <p class="text-muted">
              Validation complète des performances et de la stabilité système
            </p>
          </li>
          <li class="ms-6">
            <span
              class="absolute flex items-center justify-center size-8 bg-muted ring ring-default rounded-md -start-4 font-semibold text-lg"
            >
              6
            </span>
            <h3 class="flex items-center text-lg font-semibold">Accès à vie au support premium</h3>
            <p class="text-muted">Assistance prioritaire et mises à jour HexaBoost incluses</p>
          </li>
        </ol>

        <div class="space-y-4 px-4 md:px-0 z-0">
          <h2 class="text-xl text-pretty tracking-tight font-bold text-highlighted text-center">
            Important à savoir
          </h2>

          <div class="max-w-2xl w-full mx-auto flex flex-col gap-3">
            <UAlert
              icon="lucide:triangle-alert"
              color="neutral"
              variant="subtle"
              description="Toute modification système post-optimisation (réinstall, script tiers…) annule le suivi."
            />
            <UAlert
              icon="lucide:triangle-alert"
              color="neutral"
              variant="subtle"
              description="Un PC trop ancien ou instable pourra être *refusé* (spoof, incohérence, matos HS)."
            />
            <UAlert
              icon="lucide:triangle-alert"
              color="neutral"
              variant="subtle"
              description="Dans tous les cas, tu seras conseillé honnêtement : on ne vend pas du rêve, on vend du vrai."
            />
          </div>
        </div>
      </div>
    </UContainer>
  </section>

  <section class="relative bg-default border-t border-default">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Inclus en bonus
        </h2>
      </div>

      <div class="z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="lucide:bell-ring" class="text-primary size-6" />
              <h3 class="text-xl font-semibold">Accès anticipé</h3>
            </div>
          </template>
          <p>
            Accès anticipé aux nouvelles fonctionnalités et mises à jour HexaBoost, pour rester à la
            pointe de l'optimisation.
          </p>
        </UCard>
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="lucide:gamepad-2" class="text-primary size-6" />
              <h3 class="text-xl font-semibold">Conseils personnalisés</h3>
            </div>
          </template>
          <p>
            Conseils personnalisés pour Siege X et autres jeux, adaptés à ton matériel et à ton
            style de jeu.
          </p>
        </UCard>
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="lucide:circle-help" class="text-primary size-6" />
              <h3 class="text-xl font-semibold">Suivi à vie pour toutes tes questions</h3>
            </div>
          </template>
          <p>Suivi à vie pour toutes tes questions post-optimisation et assistance prioritaire.</p>
        </UCard>
      </div>
    </UContainer>
  </section>

  <section class="relative bg-default border-t border-default">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Fais de ton PC un outil de performance. <br />
          Pas une source de frustration.
        </h2>

        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          HexaBoost, c’est ton setup. Nettoyé. Accéléré. Optimisé.
        </p>
      </div>

      <UCard class="z-0 max-w-md mx-auto">
        <div class="flex flex-col items-center gap-4">
          <UBadge label="Offre de lancement" variant="soft" size="lg" class="rounded-full" />

          <div class="flex items-end justify-center">
            <span class="text-muted line-through text-lg">100 €</span>
            <span class="text-3xl ms-2 font-bold text-highlighted">90 €</span>
          </div>

          <ul class="w-full space-y-2">
            <li class="flex items-center">
              <UIcon name="lucide:check" class="text-primary me-2 size-5" />
              <span>Optimisation HexaBoost complète</span>
            </li>
            <li class="flex items-center">
              <UIcon name="lucide:check" class="text-primary me-2 size-5" />
              <span>Support technique à vie</span>
            </li>
            <li class="flex items-center">
              <UIcon name="lucide:check" class="text-primary me-2 size-5" />
              <span>Mises à jour HexaBoost incluses</span>
            </li>
          </ul>
        </div>

        <template #footer>
          <div class="flex flex-col items-center gap-3">
            <UButton
              to="https://www.hardwaremodding.fr/product/hexa-boost/"
              class="w-full"
              color="primary"
              size="xl"
              icon="lucide:shopping-cart"
            >
              Commander mon HexaBoost
            </UButton>
            <p class="text-xs text-muted text-center">Paiement sécurisé · Satisfaction garantie</p>
          </div>
        </template>
      </UCard>
    </UContainer>
  </section>
</template>
