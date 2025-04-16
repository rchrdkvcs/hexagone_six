<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import AppButton from '~/components/utils/AppButton.vue'
</script>

<template>
  <Head title="R6Calls - Apprendre les callouts de Rainbow Six Siege en français" />

  <div class="min-h-screen">
    <!-- Hero Section -->
    <header
      class="container mx-auto px-4 py-20 md:py-32 md:pt-48 flex flex-col items-center text-center space-y-6"
    >
      <img alt="Logo" class="h-12" src="/public/images/logo.png" />
      <p class="text-xl md:text-2xl text-white/80 max-w-3xl mb-10">
        Maîtrisez les callouts des maps de Rainbow Six Siege en français.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <AppButton href="/cartes" icon="i-mdi:map" label="Voir les cartes" />
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
  </div>
</template>
