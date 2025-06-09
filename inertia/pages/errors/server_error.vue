<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'

defineProps<{ error: any }>()
</script>

<template>
  <Head title="Erreur serveur" />

  <div class="size-full min-h-screen flex flex-col items-center justify-center">
    <UCard>
      <template #header>
        <h1 class="font-semibold">Page non trouvée</h1>
        <p class="text-sm text-muted">
          {{ error?.message || "Une erreur inattendue s'est produite sur le serveur." }}
        </p>
      </template>

      <div class="size-full flex flex-col items-center justify-center gap-4">
        <h1 class="text-[128px] font-bold leading-tight">500</h1>
        <UButton
          label="Retourner en lieu sur"
          icon="lucide:home"
          color="neutral"
          variant="subtle"
          to="/"
          size="lg"
        />
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Si vous pensez que c'est une erreur, veuillez contacter le support.
        </p>
      </template>
    </UCard>
  </div>
</template>
