<script lang="ts" setup></script>

<template>
  <section class="relative bg-default border-t border-default" id="features">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />
    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Essayez HexaCall maintenant !
        </h2>
        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          Participez à l'évolution de la plateforme et aidez-nous à créer un langage commun pour
          tous les joueurs francophones de Rainbow Six Siege.
        </p>
      </div>

      <!-- Bouton principal CTA -->
      <div class="flex justify-center z-0">
        <UButton
          to="/hexacall/cartes"
          icon="lucide:map-pin"
          label="Découvre HexaCall"
          color="primary"
          variant="solid"
          size="xl"
        />
      </div>

      <USeparator label="Ou suivez-nous" class="z-0 w-2/3 mx-auto" />

      <!-- Boutons de réseaux sociaux -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center z-0">
        <UButton
          to="https://discord.gg/ABFsPxuYZr"
          icon="simple-icons:discord"
          label="Discord"
          color="neutral"
          variant="soft"
          target="_blank"
          class="justify-center sm:justify-start"
          size="lg"
        />

        <UButton
          to="https://x.com/hexagonesix"
          icon="simple-icons:x"
          label="Twitter"
          color="neutral"
          variant="soft"
          target="_blank"
          class="justify-center sm:justify-start"
          size="lg"
        />
      </div>
    </UContainer>
  </section>
</template>
