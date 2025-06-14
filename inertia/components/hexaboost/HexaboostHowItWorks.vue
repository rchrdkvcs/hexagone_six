<script setup lang="ts"></script>

<template>
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
</template>

<style scoped></style>
