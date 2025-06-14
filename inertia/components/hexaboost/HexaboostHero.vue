<script setup lang="ts"></script>

<template>
  <UContainer
    class="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-4 relative"
  >
    <UBadge
      label="Par Snite et HardwareModding"
      variant="subtle"
      color="neutral"
      size="lg"
      class="rounded-full md:hidden"
    />
    <UBadge
      label="Par Snite et HardwareModding – En partenariat avec Hexagone 6"
      variant="subtle"
      color="neutral"
      size="xl"
      class="rounded-full hidden md:flex"
    />

    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">HexaBoost</h1>

    <p class="text-base md:text-lg text-muted max-w-2xl md:text-center mt-4">
      HexaBoost, c’est une optimisation complète de ton système, pensée par des experts techniques,
      et ajustée pour les exigences des joueurs compétitifs, avec une attention particulière portée
      à Rainbow Six Siege X
    </p>

    <p class="text-base md:text-lg text-muted max-w-2xl md:text-center mt-4">
      Pas de logiciel miracle, pas de promesses douteuses :
      <b>juste une intervention sérieuse, calibrée, et stable</b>, réalisée par des techniciens
      reconnus.
    </p>

    <UAlert
      class="mt-4 bg-muted w-fit"
      color="success"
      variant="subtle"
      icon="lucide:check-circle"
      title="Offre de lancement exclusive"
      description="Profitez d'une reduction de 10% pour une durée limitée !"
      :ui="{
        icon: 'size-11',
      }"
    />

    <ULink
      to="#features"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <span class="text-sm font-medium text-primary">Découvrir HexaBoost</span>
      <UIcon name="lucide:chevron-down" class="size-5 text-primary animate-bounce" />
    </ULink>
  </UContainer>
</template>

<style scoped></style>
