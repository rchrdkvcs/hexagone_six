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
          Des fonctionnalités pensées pour la communauté
        </h2>
        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          Une plateforme collaborative développée par et pour les joueurs de Rainbow Six Siege.
        </p>
      </div>

      <div class="flex-grow flex flex-col gap-8 md:gap-12 w-full">
        <UCard
          :ui="{
            body: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
          }"
          class="backdrop-blur-xl group w-full"
          variant="subtle"
        >
          <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-8 p-4">
            <div class="flex items-center gap-3 md:gap-4">
              <UBadge class="p-2" color="primary" variant="subtle">
                <UIcon
                  class="size-5 md:size-6 transition-transform duration-300 group-hover:rotate-180"
                  name="lucide:arrow-up-down"
                />
              </UBadge>
              <h2 class="text-xl md:text-2xl font-semibold">Callouts définis par la communauté</h2>
            </div>

            <p class="text-sm md:text-base text-muted">
              Notre système de vote innovant permet à la communauté de faire émerger les meilleurs
              callouts.
              <br class="hidden md:block" />
              <br class="hidden md:block" />
              Comme sur Reddit ou StackOverflow, votez pour les termes les plus pertinents et
              contribuez à créer un langage commun pour tous les joueurs francophones.
            </p>
          </div>

          <div class="w-full h-48 md:h-auto overflow-hidden rounded-lg">
            <img
              alt="Image d'illustration du système de vote"
              class="rounded-lg object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out border border-muted/25"
              src="/public/images/landing_feat1.webp"
            />
          </div>
        </UCard>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-grow">
          <UCard
            :ui="{ body: 'flex-grow' }"
            class="backdrop-blur-xl group flex flex-col"
            variant="subtle"
          >
            <template #header>
              <div class="flex items-center gap-3 md:gap-4">
                <UBadge class="p-2" color="primary" variant="subtle">
                  <UIcon
                    class="size-5 md:size-6 transition-transform duration-300 group-hover:rotate-180"
                    name="lucide:mouse-pointer-click"
                  />
                </UBadge>
                <h2 class="text-xl md:text-2xl font-semibold">Cartes interactives simplifiées</h2>
              </div>
              <p class="text-sm md:text-base text-muted mt-3">
                Naviguez intuitivement entre les étages et les zones avec nos cartes interactives.
                Repérez facilement les callouts populaires et ajoutez vos suggestions en quelques
                clics, même pendant vos sessions de jeu.
              </p>
            </template>

            <div class="w-full h-40 md:h-auto overflow-hidden rounded-lg">
              <img
                alt="Image d'illustration du système de vote"
                class="rounded-md object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out border border-muted/25"
                src="/public/images/landing_feat2.webp"
              />
            </div>
          </UCard>

          <UCard
            :ui="{ body: 'flex-grow' }"
            class="backdrop-blur-xl group flex flex-col"
            variant="subtle"
          >
            <template #header>
              <div class="flex items-center gap-3 mb-2">
                <UBadge class="p-2" color="primary" variant="subtle">
                  <UIcon
                    class="size-5 md:size-6 transition-transform duration-300 group-hover:rotate-180"
                    name="lucide:list-filter"
                  />
                </UBadge>
                <h2 class="text-xl md:text-2xl font-semibold">Toutes les maps à portée de main</h2>
              </div>
              <p class="text-sm md:text-base text-muted mt-3">
                Accédez à l'intégralité des cartes du jeu avec notre sélecteur de playlist intuitif.
                Que vous jouiez en Quick Match, Unranked ou Ranked, retrouvez instantanément les
                callouts des maps de votre rotation actuelle.
              </p>
            </template>

            <div class="w-full h-40 md:h-auto overflow-hidden rounded-lg">
              <img
                alt="Image d'illustration du système de vote"
                class="rounded-md object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out border border-muted/25"
                src="/public/images/landing_feat3.webp"
              />
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
