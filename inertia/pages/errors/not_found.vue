<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Page non trouvée" />

  <div class="size-full min-h-screen flex flex-col items-center justify-center">
    <UCard>
      <template #header>
        <h1 class="font-semibold">Page non trouvée</h1>
        <p class="text-sm text-muted">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
      </template>

      <div class="size-full flex flex-col items-center justify-center gap-4">
        <h1 class="text-[128px] font-bold leading-tight">404</h1>
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
