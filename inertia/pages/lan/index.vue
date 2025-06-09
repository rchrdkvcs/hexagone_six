<script setup lang="ts"></script>

<template>
  <UContainer
    class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24 min-h-[calc(100vh-64px)]"
  >
    <div class="space-y-2 px-4 md:px-0 z-0">
      <h1
        class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
      >
        La LAN Hexagone 6 est devenue en 2 éditions une référence francophone sur Rainbow Six :
        Siege X
      </h1>
      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Organisée en plein coeur de Paris, elle a rassemblé les meilleurs joueurs, streamers et
        partenaires du jeu dans un cadre compétitif exigeant et authentique.
      </p>
      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Retrouvez ci-dessous les vidéos officielles et les albums photos pour revivre l’événement.
      </p>
    </div>

    <div class="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="flex flex-col">
              <span class="text-muted text-lg">Hexagone Six - Paris</span>
              <span class="text-2xl font-semibold">Edition 2025</span>
            </h2>
            <UBadge color="success" variant="subtle" label="Terminé" size="lg" />
          </div>
        </template>

        <div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="p-3 flex flex-col justify-center">
              <p class="text-sm text-muted">Cashprize</p>
              <p class="text-xl font-semibold">
                6 700 € <span class="text-muted text-sm">/ 10 000 €</span>
              </p>
            </div>

            <div class="p-3 flex flex-col justify-center">
              <p class="text-sm text-muted">Vainqueur</p>
              <p class="text-xl font-semibold">Ence</p>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UButton
                icon="lucide:images"
                color="neutral"
                variant="ghost"
                to="/lan/2025/galleries"
              >
                Galerie photos
              </UButton>
              <UButton
                icon="lucide:circle-play"
                color="neutral"
                variant="ghost"
                to="https://youtu.be/wGLqq0fOJCY?si=TV4h7gMuWNfRJkkM"
              >
                Revivre en vidéo
              </UButton>
            </div>
            <UDropdownMenu
              arrow
              :items="[
                {
                  label: 'Jour 1',
                  to: 'https://youtu.be/LvwEukql8F8?si=WXuExdE_p-Wzvv6m',
                },
                {
                  label: 'Jour 2',
                  to: 'https://youtu.be/fairi0ECUsM?si=2kQSlSQH3dITHUBi',
                },
              ]"
              :ui="{
                content: 'w-48',
              }"
            >
              <UButton label="VOD" icon="lucide:monitor-play" color="neutral" variant="ghost" />
            </UDropdownMenu>
          </div>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="flex flex-col">
              <span class="text-muted text-lg">Hexagone Six - Paris</span>
              <span class="text-2xl font-semibold">Edition 2024</span>
            </h2>
            <UBadge color="success" variant="subtle" label="Terminé" size="lg" />
          </div>
        </template>

        <div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="p-3 flex flex-col justify-center">
              <p class="text-sm text-muted">Cashprize</p>
              <p class="text-xl font-semibold">
                10 000 € <span class="text-muted text-sm">/ 10 000 €</span>
              </p>
            </div>

            <div class="p-3 flex flex-col justify-center">
              <p class="text-sm text-muted">Vainqueur</p>
              <p class="text-xl font-semibold">Team Valor</p>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UButton
                icon="lucide:images"
                color="neutral"
                variant="ghost"
                to="/lan/2024/galleries"
              >
                Galerie photos
              </UButton>
              <UButton
                icon="lucide:circle-play"
                color="neutral"
                variant="ghost"
                to="https://youtu.be/PQBDtL_vzrI?si=8KkmCuJZN1Nvx3QE"
              >
                Revivre en vidéo
              </UButton>
            </div>
            <UDropdownMenu
              arrow
              :items="[
                {
                  label: 'Jour 1',
                  to: 'https://youtu.be/N0fq808Pf3Y?si=Qb0KPfz5dcH8f1rP',
                },
                {
                  label: 'Jour 2',
                  to: 'https://youtu.be/LUn4_GHvDro?si=nx0VxAc-eyMSj2lE',
                },
              ]"
              :ui="{
                content: 'w-48',
              }"
            >
              <UButton label="VOD" icon="lucide:monitor-play" color="neutral" variant="ghost" />
            </UDropdownMenu>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
