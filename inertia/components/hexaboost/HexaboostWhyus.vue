<script setup lang="ts">
import ImageComparison from '../utils/ImageComparison.vue'
import hexaboostBefore from '/public/images/hexaboost_before.webp'
import hexaboostAfter from '/public/images/hexaboost_after.webp'
</script>

<template>
  <section class="relative bg-default border-t border-default">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Pourquoi HexaBoost est différent ?
        </h2>
        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          On ne vend pas du rêve, on vend du vrai !
        </p>
      </div>

      <!-- Composant de comparaison avant/après -->
      <div class="px-4 w-full gap-2 flex flex-col">
        <ImageComparison
          :before-image="hexaboostBefore"
          :after-image="hexaboostAfter"
          before-label="Avant HexaBoost"
          after-label="Après HexaBoost"
          before-alt="Performance avant HexaBoost"
          after-alt="Performance après HexaBoost"
        />

        <p class="text-muted z-10 text-sm">
          * Attention, le premier benchmark avec un résultat de 380 Fps a été réalisé avec une
          résolution de 2K or le second benchmark en 1080p.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 z-0">
        <div class="p-4 bg-muted ring ring-default rounded-lg">
          <p class="text-lg">
            C’est le setup exact utilisé par <b>Sixquatre</b> sur <b>Siege X</b>
          </p>
        </div>

        <div class="p-4 bg-muted ring ring-default rounded-lg">
          <p class="text-lg">
            C’est pensé pour des machines de <b>joueurs compétitifs</b>, pas une optimisation
            “généraliste”
          </p>
        </div>

        <div class="p-4 bg-muted ring ring-default rounded-lg">
          <p class="text-lg">
            C’est fait à la <b>main, avec sérieux, par des techniciens</b> avec +20 ans de pratique
            réelle
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>
