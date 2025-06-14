<script setup lang="ts"></script>

<template>
  <UModal>
    <template #content>
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4">Connexion à Discord</h2>
        <p class="mb-4">Pour continuer, veuillez vous connecter à votre compte Discord.</p>
        <div class="flex justify-center">
          <UButton
            class="w-full justify-center"
            color="neutral"
            external
            icon="ic:baseline-discord"
            label="Discord"
            size="xl"
            target="_self"
            to="/discord/redirect"
            variant="subtle"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
