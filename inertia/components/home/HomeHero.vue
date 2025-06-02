<script lang="ts" setup></script>

<template>
  <UContainer
    as="header"
    class="min-h-[calc(100vh-64px)] w-full grid grid-rows-[1fr_auto] relative"
  >
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-8 md:py-0">
      <div class="col-span-1 md:col-span-2 flex flex-col gap-6 justify-center items-start">
        <div class="px-3 py-1 rounded-full bg-elevated border border-accented">
          <p class="text-sm md:text-base">Le premier site de naming Siege X participatif !</p>
        </div>

        <div class="space-y-3 md:space-y-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span class="font-semibold">Propose, Vote, Apprends </span>Tous les calls de Siege X
          </h1>
          <p class="text-base md:text-lg text-muted max-w-2/3">
            Débutant ou PRO, ici, chaque joueur parle le même langage. Améliorez votre communication
            grâce à HexaCalls.
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2 relative group h-fit md:h-full">
        <img
          src="/public/images/logo.png"
          alt="Logo of Hexagone Six"
          class="size-48 md:size-64 xl:size-96"
        />

        <span
          class="bg-primary/25 size-64 md:size-80 xl:size-[500px] absolute top-1/2 -translate-y-1/2 rounded-full blur-3xl -z-1"
        />
      </div>
    </div>

    <ULink
      to="#features"
      class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <span class="opacity-50 size-full bg-primary absolute inset-0 rounded-full blur-2xl -z-1" />

      <span
        class="text-sm font-medium text-muted group-hover:text-primary transition-colors duration-300"
        >Découvrir</span
      >
      <div class="relative">
        <UIcon
          name="lucide:mouse"
          class="size-8 text-muted group-hover:text-primary transition-colors duration-300"
        />
        <span
          class="absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 bg-primary rounded-full animate-ping"
        />
        <div class="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <UIcon name="lucide:chevron-down" class="size-5 text-primary animate-bounce" />
        </div>
      </div>
    </ULink>
  </UContainer>
</template>
