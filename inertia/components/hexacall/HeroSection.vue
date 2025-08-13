<script lang="ts" setup></script>

<template>
  <UContainer
    class="min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] h-full flex flex-col xl:grid gap-16 sm:gap-y-24 xl:grid-cols-2 lg:items-center relative py-16"
  >
    <div class="flex flex-col items-start gap-4 lg:gap-6 z-10">
      <UBadge
        icon="fxemoji:franceflag"
        label="Le 1er site de naming Siege X participatif !"
        variant="subtle"
        size="lg"
        class="rounded-full"
      />

      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-wrap md:text-nowrap">
        Propose, Vote, Apprends
      </h1>
      <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Tous les calls de Siege X</h2>
      <p class="text-base md:text-lg text-muted">
        Débutant ou PRO, ici, chaque joueur parle le même langage. Améliorez votre communication
        grâce à HexaCall.
      </p>
      <UButton to="/hexacall/cartes" size="xl" icon="lucide:map" label="Voir les cartes" />
    </div>

    <div class="relative w-full h-fit flex items-center justify-center mt-8 xl:mt-0">
      <img
        alt="Image d'illustration de HexaCall"
        class="w-full hidden lg:block"
        src="/images/hexacall_app.webp"
        loading="eager"
      />

      <img
        alt="Image d'illustration de HexaCall"
        class="absolute top-1/2 -translate-1/2 -right-1/2 z-10 w-48 md:w-72 hidden lg:block"
        src="/images/hexacall_slideover.webp"
        loading="eager"
      />

      <img
        alt="Image d'illustration de HexaCall"
        class="max-h-[40vh] w-auto sm:w-56 md:w-64 object-contain lg:w-36 lg:max-h-none lg:absolute lg:bottom-0 lg:left-0 lg:-translate-x-1/3 lg:translate-y-1/3 z-10"
        src="/images/hexacall_phone.webp"
        loading="eager"
      />
    </div>

    <ULink
      to="#features"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <span class="text-sm font-medium text-primary">Découvrir</span>
      <UIcon name="lucide:chevron-down" class="size-5 text-primary animate-bounce" />
    </ULink>
  </UContainer>
</template>
