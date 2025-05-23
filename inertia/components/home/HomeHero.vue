<script lang="ts" setup></script>

<template>
  <UContainer as="header" class="min-h-[calc(100vh-64px)] w-full grid grid-rows-[1fr_auto]">
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-8 md:py-0">
      <div class="col-span-1 md:col-span-2 flex flex-col gap-6 justify-center items-start">
        <div
          class="px-3 py-1.5 rounded-full bg-elevated border border-accented flex gap-2 items-center max-w-full overflow-hidden"
        >
          <UIcon class="size-5 flex-shrink-0" name="fxemoji:franceflag" />
          <p class="text-sm sm:text-base whitespace-nowrap text-ellipsis overflow-hidden">
            Le premier site dédié a la communauté
            <span class="font-semibold">Rainbow Six Francais</span> !
          </p>
        </div>

        <div class="space-y-3 md:space-y-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span class="font-semibold">Apprenez</span> et
            <span class="font-semibold">Proposer</span> les callouts de demain !
          </h1>
          <p class="text-base md:text-lg text-muted">
            Que vous soyez débutant ou joueur expérimenté, vous trouverez ici les ressources pour
            améliorer votre communication en jeu.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 md:gap-4">
          <UButton
            class="rounded-full"
            icon="lucide:map"
            label="Voir les cartes"
            size="lg"
            to="/cartes"
          />
          <UButton
            class="rounded-full"
            color="neutral"
            icon="lucide:info"
            label="En apprendre plus"
            size="md"
            to="/cartes"
            variant="soft"
          />
        </div>
      </div>
    </div>

    <!--    <div class="w-full flex justify-center py-4 md:py-0 px-4 text-center">-->
    <!--      <h2 class="text-sm md:text-base text-muted">-->
    <!--        Un projet soutenue par des acteurs majeures de la scène-->
    <!--        <span class="font-medium">Rainbow Six Siege</span>-->
    <!--      </h2>-->
    <!--    </div>-->
  </UContainer>
</template>
