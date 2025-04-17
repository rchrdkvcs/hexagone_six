<script lang="ts" setup>
import AppButton from '~/components/utils/AppButton.vue'
import { Head } from '@inertiajs/vue3'

defineProps<{ error: any }>()
</script>

<template>
  <Head title="Erreur serveur" />

  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
    <div
      class="max-w-lg w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 shadow-lg"
    >
      <h1 class="text-6xl font-bold mb-2">500</h1>

      <h2 class="text-2xl font-medium mb-6 text-white/90">Erreur serveur</h2>

      <p class="text-white/70 mb-8">
        {{ error?.message || "Une erreur inattendue s'est produite sur le serveur." }}
      </p>

      <div class="flex justify-center">
        <AppButton class="backdrop-blur-md" href="/" icon="i-mdi:home" label="Retour à l'accueil" />
      </div>
    </div>
  </div>
</template>
