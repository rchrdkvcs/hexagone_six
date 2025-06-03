<script lang="ts" setup></script>

<template>
  <UContainer class="w-full py-8 md:py-16 px-4 md:px-0">
    <UCard
      :ui="{ body: 'grid grid-cols-2' }"
      class="overflow-hidden backdrop-blur-xl"
      variant="subtle"
    >
      <div class="flex flex-col justify-center items-start space-y-6">
        <div class="flex items-center gap-3">
          <UBadge class="p-2" color="primary" variant="subtle">
            <UIcon class="size-5 md:size-6" name="lucide:award" />
          </UBadge>
          <h2 class="text-2xl md:text-3xl font-bold">Essayez HexaCall maintenant !</h2>
        </div>

        <p class="text-base md:text-lg text-muted leading-relaxed">
          Participez à l'évolution de la plateforme et aidez-nous à créer un langage commun pour
          tous les joueurs francophones de Rainbow Six Siege.
        </p>

        <div class="flex gap-4 mt-4">
          <UButton icon="lucide:map" label="Découvre HexaCall" size="xl" to="/cartes" />
          <UButton
            icon="mdi:discord"
            label="Rejoindre le Discord"
            size="xl"
            to="#"
            variant="subtle"
          />
        </div>
      </div>

      <div class="flex items-center justify-center gap-2 relative group h-fit md:h-full">
        <img src="/public/images/logo.png" alt="Logo of Hexagone Six" class="size-48" />

        <span
          class="bg-primary/25 size-3/4 absolute top-1/2 -translate-y-1/2 rounded-full blur-3xl -z-1"
        />
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
