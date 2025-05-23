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
          <h2 class="text-2xl md:text-3xl font-bold">Rejoignez la communauté</h2>
        </div>

        <p class="text-base md:text-lg text-muted leading-relaxed">
          Participez à l'évolution de la plateforme et aidez-nous à créer un langage commun pour
          tous les joueurs francophones de Rainbow Six Siege.
        </p>

        <div class="flex gap-4 mt-4">
          <UButton color="primary" icon="mdi:discord" label="Rejoindre Discord" size="lg" to="#" />
          <UButton
            icon="lucide:map"
            label="Explorer les cartes"
            size="lg"
            to="/cartes"
            variant="outline"
          />
        </div>
      </div>

      <div class="relative flex justify-center items-center p-4 md:p-0">
        <div class="relative flex items-center justify-center">
          <img
            alt="Vue mobile de la plateforme"
            class="w-2/5 h-auto rounded-xl border-2 border-default shadow-xl transform -rotate-16 -translate-x-4 md:-translate-x-4 z-10 transition-all duration-500 hover:scale-105"
            src="/public/images/landing/mobile1.png"
          />

          <img
            alt="Vue mobile de la carte interactive"
            class="w-2/4 h-auto rounded-xl border-2 border-default shadow-2xl z-20 transition-all duration-500 hover:scale-105"
            src="/public/images/landing/mobile2.png"
          />
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
