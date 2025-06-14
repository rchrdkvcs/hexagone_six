<script setup lang="ts"></script>

<template>
  <section class="bg-default">
    <UContainer class="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-4">
      <UIcon name="lucide:x-circle" class="size-16 text-primary z-0" />
      <h1 class="text-3xl font-bold">Paiement annulé</h1>
      <p class="text-lg text-muted max-w-lg text-center">
        Votre paiement a été annulé. <br />
        Aucune somme n'a été prélevée de votre compte.
      </p>

      <div class="flex gap-4 mt-2">
        <UButton to="/" variant="ghost" label="Retour à l'accueil" icon="lucide:home" />
        <UButton
          to="/hexaboost#checkout"
          label="Réessayer"
          color="primary"
          icon="lucide:refresh-ccw"
        />
      </div>
    </UContainer>
  </section>
</template>
