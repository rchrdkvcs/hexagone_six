<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import AppButton from '~/components/utils/AppButton.vue'
</script>

<template>
  <Head title="Page non trouvée" />

  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
    <div
      class="max-w-lg w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 shadow-lg"
    >
      <h1 class="text-6xl font-bold mb-2">404</h1>

      <h2 class="text-2xl font-medium mb-6 text-white/90">Page non trouvée</h2>

      <p class="text-white/70 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>

      <div class="flex justify-center">
        <AppButton class="backdrop-blur-md" href="/" icon="i-mdi:home" label="Retour à l'accueil" />
      </div>
    </div>

    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-primary-500/10 blur-3xl"
      ></div>
      <div
        class="absolute right-1/3 bottom-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl"
      ></div>
    </div>
  </div>
</template>
