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

      <div class="flex flex-col md:grid md:grid-cols-3 gap-4 z-0">
        <ULink
          to="https://discord.com"
          class="flex rounded-lg bg-elevated/50 ring ring-default transition ease-in-out duration-250 hover:bg-elevated hover:ring-accented p-4 gap-4 items-center"
        >
          <UIcon
            name="simple-icons:discord"
            class="text-indigo-400 size-12 rounded-lg bg-default p-2 flex items-center justify-center"
          />
          <span class="font-medium">Rejoignez notre serveur Discord</span>
        </ULink>

        <ULink
          to="/hexacall/cartes"
          class="flex rounded-lg bg-primary/10 hover:bg-primary/15 ring ring-inset ring-primary/25 text-primary transition ease-in-out duration-250 p-4 gap-4 items-center"
        >
          <UIcon
            name="lucide:map-pin"
            class="text-inverted size-12 rounded-lg bg-primary p-2 flex items-center justify-center"
          />
          <span class="font-medium">Découvre HexaCall</span>
        </ULink>

        <ULink
          to="https://twitter.com/hexagonesix"
          class="flex rounded-lg bg-elevated/50 ring ring-default transition ease-in-out duration-250 hover:bg-elevated hover:ring-accented p-4 gap-4 items-center"
        >
          <UIcon
            name="simple-icons:x"
            class="text-default/100 size-12 rounded-lg bg-default p-2 flex items-center justify-center"
          />
          <span class="font-medium">Suivez-nous sur Twitter</span>
        </ULink>
      </div>
    </UContainer>
  </section>
</template>

<style scoped></style>
