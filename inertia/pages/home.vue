<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import AppButton from '~/components/utils/AppButton.vue'
</script>

<template>
  <Head title="Apprendre les callouts de Rainbow Six Siege en français" />

  <UContainer>
    <header class="h-[calc(100vh-64px)] w-full grid grid-cols-3 grid-rows-[1fr_64px]">
      <div class="col-span-2 flex flex-col gap-8 justify-center items-start size-full">
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
            R6Calls est un site communautaire qui vous permet d'apprendre et de partager les
            callouts de Rainbow Six Siege. Que vous soyez débutant ou joueur expérimenté, vous
            trouverez ici des ressources pour améliorer votre communication en jeu.
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

      <div class="size-full flex">
        <h2>Un projet soutenue par des acteurs majeures de la scène Rainbow</h2>
      </div>
    </header>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-20">
      <h2 class="text-3xl font-bold text-center mb-16">Pourquoi R6Calls?</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center backdrop-blur-md"
        >
          <div
            class="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-primary-500/25 border border-white/5"
          >
            <i class="i-mdi:map text-3xl color-white/75"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">Maps interactives</h3>
          <p class="text-white/60">
            Explorez toutes les maps du jeu avec des callouts précis pour chaque zone.
          </p>
        </div>

        <div
          class="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center backdrop-blur-md"
        >
          <div
            class="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-primary-500/25 border border-white/5"
          >
            <i class="i-mdi:account-group text-3xl color-white/75"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">Communauté française</h3>
          <p class="text-white/60">
            Conçu par et pour la communauté francophone de Rainbow Six Siege.
          </p>
        </div>

        <div
          class="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center backdrop-blur-md"
        >
          <div
            class="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-primary-500/25 border border-white/5"
          >
            <i class="i-mdi:school text-3xl color-white/75"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">Apprentissage facile</h3>
          <p class="text-white/60">
            Améliorez votre communication en jeu et progressez plus rapidement.
          </p>
        </div>
      </div>
    </section>

    <!-- Community Section -->
    <section class="container mx-auto px-4 py-20">
      <div
        class="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-10 md:p-16 relative overflow-hidden"
      >
        <div class="relative z-10 max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Rejoignez la communauté</h2>
          <p class="text-white/80 mb-8 text-lg">
            Participez à l'amélioration de R6Calls en contribuant aux callouts et en partageant vos
            connaissances avec d'autres joueurs.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <AppButton
              as="a"
              class="backdrop-blur-md"
              href="https://discord.com"
              icon="i-mdi:discord"
              label="Rejoignez le discord"
            />
            <AppButton
              class="backdrop-blur-md"
              href="/contribuer"
              icon="i-mdi:money"
              label="Contribuer"
              variant="secondary"
            />
          </div>
        </div>
        <div class="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-pattern"></div>
      </div>
    </section>
  </UContainer>
</template>
