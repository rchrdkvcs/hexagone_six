<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Apprendre les callouts de Rainbow Six Siege en français" />

  <div class="space-y-8">
    <!-- Header -->
    <UContainer as="header" class="h-[calc(100vh-64px)] w-full grid grid-rows-[1fr_64px]">
      <div class="size-full grid grid-cols-3">
        <div class="col-span-2 flex flex-col gap-6 justify-center items-start size-full">
          <div
            class="px-3 py-1.5 rounded-full bg-elevated border border-accented flex gap-2 items-center"
          >
            <UIcon name="fxemoji:franceflag" class="size-5" />
            <p>
              Le premier site dédié a la communauté
              <span class="font-semibold">Rainbow Six Francais</span> !
            </p>
          </div>

          <div class="space-y-4">
            <h1 class="text-6xl leading-tight">
              <span class="font-semibold">Apprenez</span> et
              <span class="font-semibold">Proposer</span> les callouts de demain !
            </h1>
            <p class="text-lg text-muted">
              Le site communautaire qui vous permet d'apprendre et de partager les callouts de R6.
              Que vous soyez débutant ou joueur expérimenté, vous trouverez ici les ressources pour
              améliorer votre communication en jeu.
            </p>
          </div>

          <div class="flex gap-4">
            <UButton
              icon="lucide:map"
              label="Voir les cartes"
              size="xl"
              to="/cartes"
              class="rounded-full"
            />
            <UButton
              icon="lucide:info"
              label="En apprendre plus"
              size="lg"
              to="/cartes"
              color="neutral"
              variant="soft"
              class="rounded-full"
            />
          </div>
        </div>
      </div>

      <div class="size-full flex justify-center">
        <h2 class="text-muted">
          Un projet soutenue par des acteurs majeures de la scène
          <span class="font-medium">Rainbow Six Siege</span>
        </h2>
      </div>
    </UContainer>

    <!-- Features -->
    <UContainer class="min-h-[calc(100vh-64px)] w-full grid grid-rows-2 grid-cols-2 gap-8">
      <UCard variant="subtle" class="backdrop-blur-lg col-span-2 row-span-1">
        <template #header>
          <h2 class="text-2xl font-semibold">Les dernières cartes</h2>
          <p class="text-muted">
            Découvrez les dernières cartes ajoutées par la communauté et partagez vos propres
            callouts.
          </p>
        </template>
      </UCard>

      <UCard variant="subtle" class="backdrop-blur-lg">
        <template #header>
          <h2 class="text-2xl font-semibold">Les dernières cartes</h2>
          <p class="text-muted">
            Découvrez les dernières cartes ajoutées par la communauté et partagez vos propres
            callouts.
          </p>
        </template>
      </UCard>

      <UCard variant="subtle" class="backdrop-blur-lg">
        <template #header>
          <h2 class="text-2xl font-semibold">Les dernières cartes</h2>
          <p class="text-muted">
            Découvrez les dernières cartes ajoutées par la communauté et partagez vos propres
            callouts.
          </p>
        </template>
      </UCard>
    </UContainer>

    <!-- Faq -->
    <UContainer class="min-h-[calc(100vh-64px)] w-full grid grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold">Des questions ?</h2>
        <p class="text-muted">
          Consultz notre FAQ pour trouver des réponses aux questions les plus fréquentes.
        </p>
      </div>

      <UCollapsible class="flex flex-col gap-2">
        <UButton
          class="group"
          label="Open"
          color="neutral"
          variant="subtle"
          trailing-icon="lucide:chevron-down"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
          block
        />

        <template #content>
          <p>Some Content here</p>
        </template>
      </UCollapsible>
    </UContainer>
  </div>
</template>
