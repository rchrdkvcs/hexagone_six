<script setup lang="ts"></script>

<template>
  <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
    <div class="space-y-2 px-4 md:px-0 z-0">
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
      >
        Nos Partenaires
      </h2>
      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Découvrez les marques qui nous font confiance et profitez d'avantages exclusifs grâce à nos
        codes promotionnels
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard
        class="transition-all duration-300 hover:shadow-xl"
        :ui="{
          root: 'flex flex-col',
          body: 'flex-grow',
        }"
      >
        <div class="flex flex-col items-center">
          <div class="h-32 flex items-center justify-center mb-6">
            <img
              src="/public/images/sponsors_msi.webp"
              alt="MSI logo"
              class="max-h-full max-w-[80%] object-contain"
            />
          </div>

          <h3 class="text-2xl font-bold mb-3">MSI</h3>

          <p class="text-left text-muted mb-6">
            MSI est un leader mondial dans la conception et la fabrication de matériel gaming haute
            performance. Leurs produits innovants offrent une expérience de jeu incomparable avec
            des solutions de pointe pour les joueurs et créateurs de contenu.
          </p>
        </div>

        <template #footer>
          <UButton
            label="Visiter le site"
            icon="lucide:external-link"
            to="https://msi.gm/S04F5BA3"
            target="_blank"
            color="neutral"
            variant="subtle"
            block
          />
        </template>
      </UCard>

      <UCard
        class="transition-all duration-300 hover:shadow-xl"
        :ui="{
          root: 'flex flex-col',
          body: 'flex-grow',
        }"
      >
        <div class="flex flex-col items-center">
          <div class="h-32 flex items-center justify-center mb-6">
            <img
              src="/public/images/sponsors_holy.webp"
              alt="Holy Energy logo"
              class="max-h-full max-w-[80%] object-contain"
            />
          </div>

          <h3 class="text-2xl font-bold mb-3">Holy Energy</h3>

          <p class="text-left text-muted mb-6">
            HOLY combine enfin un bon goût et une bonne conscience. La promesse que nous te faisons
            est simple : des produits de première qualité, un service de pointe et une communauté de
            passionnés. Fais maintenant partie de la révolution des soft drinks et juge par toi-même
            !
          </p>

          <div
            class="px-3 py-2 rounded-lg mb-6 w-full text-center bg-elevated flex items-center justify-center gap-2"
          >
            <p>Code promo : <span class="font-bold">HEXAGONE10</span></p>
            <UBadge label="-10%" variant="soft" color="success" size="lg" />
          </div>
        </div>

        <template #footer>
          <UButton
            label="Visiter le site"
            icon="lucide:external-link"
            to="https://fr.weareholy.com/?ref=sixquatre&utm_medium=creator&utm_source=creator"
            target="_blank"
            color="neutral"
            variant="subtle"
            block
          />
        </template>
      </UCard>

      <UCard
        class="transition-all duration-300 hover:shadow-xl"
        :ui="{
          root: 'flex flex-col',
          body: 'flex-grow',
        }"
      >
        <div class="flex flex-col items-center">
          <div class="h-32 flex items-center justify-center mb-6">
            <img
              src="/public/images/sponsors_hm.webp"
              alt="Hardware Modding logo"
              class="max-h-full max-w-[80%] object-contain"
            />
          </div>

          <h3 class="text-2xl font-bold mb-3">Hardware Modding</h3>

          <p class="text-left text-muted mb-6">
            HardwareModding est la référence pour tous les passionnés de personnalisation et
            d'optimisation PC. Leur expertise et leurs produits exclusifs permettent de créer des
            configurations uniques.
          </p>
        </div>

        <template #footer>
          <UButton
            label="Visiter le site"
            icon="lucide:external-link"
            to="https://www.hardwaremodding.fr/"
            target="_blank"
            color="neutral"
            variant="subtle"
            block
          />
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
