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
</template>

<style scoped></style>
