<script setup lang="ts">
import PcCard from '~/components/materials/PcCard.vue'
</script>

<template>
  <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
    <div class="space-y-2 px-4 md:px-0 z-0">
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
      >
        Des PC haut de gamme pour Rainbow Six Siege
      </h2>

      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Découvrez notre sélection d’ordinateurs puissants conçus pour vous donner l’avantage sur
        Rainbow Six Siege et tous vos jeux compétitifs préférés.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
      <PcCard
        name="Clutch X Pro"
        description="Prêt à l’emploi, optimisé Esport, FPS extrêmes en 1080p/1440p."
        price="1899,99 €"
        imageUrl="/images/materials/clutch-x-pro.webp"
        :config="{
          cpu: 'AMD Ryzen 7 9800X3D ',
          gpu: 'MSI RTX 5070 12 Go VENTUS 2X ',
          ram: '32 Go DDR5 6000 MHz',
          storage: '1 To NVMe Crucial E100 ',
          cooling: 'MSI MAG AIO 360mm',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé /n/n Rainbow Six Siege préinstallé`"
        :performance="{
          rainbowSixSiege: '600+ FPS',
          valorant: '500-800 FPS',
          cs2: '500-800 FPS',
          fortnite: '500-800 FPS',
        }"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-pro/"
      />

      <PcCard
        name="Clutch X Pro"
        description="Prêt à l’emploi, optimisé Esport, FPS extrêmes en 1080p/1440p."
        price="1899,99 €"
        imageUrl="/images/materials/clutch-x-pro.webp"
        :config="{
          cpu: 'AMD Ryzen 7 9800X3D ',
          gpu: 'MSI RTX 5070 12 Go VENTUS 2X ',
          ram: '32 Go DDR5 6000 MHz',
          storage: '1 To NVMe Crucial E100 ',
          cooling: 'MSI MAG AIO 360mm',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé /n/n Rainbow Six Siege préinstallé`"
        :performance="{
          rainbowSixSiege: '600+ FPS',
          valorant: '500-800 FPS',
          cs2: '500-800 FPS',
          fortnite: '500-800 FPS',
        }"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-pro/"
      />

      <PcCard
        name="Clutch X Pro"
        description="Prêt à l’emploi, optimisé Esport, FPS extrêmes en 1080p/1440p."
        price="1899,99 €"
        imageUrl="/images/materials/clutch-x-pro.webp"
        :config="{
          cpu: 'AMD Ryzen 7 9800X3D ',
          gpu: 'MSI RTX 5070 12 Go VENTUS 2X ',
          ram: '32 Go DDR5 6000 MHz',
          storage: '1 To NVMe Crucial E100 ',
          cooling: 'MSI MAG AIO 360mm',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé /n/n Rainbow Six Siege préinstallé`"
        :performance="{
          rainbowSixSiege: '600+ FPS',
          valorant: '500-800 FPS',
          cs2: '500-800 FPS',
          fortnite: '500-800 FPS',
        }"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-pro/"
      />

      <PcCard
        name="Clutch X Pro"
        description="Prêt à l’emploi, optimisé Esport, FPS extrêmes en 1080p/1440p."
        price="1899,99 €"
        imageUrl="/images/materials/clutch-x-pro.webp"
        :config="{
          cpu: 'AMD Ryzen 7 9800X3D ',
          gpu: 'MSI RTX 5070 12 Go VENTUS 2X ',
          ram: '32 Go DDR5 6000 MHz',
          storage: '1 To NVMe Crucial E100 ',
          cooling: 'MSI MAG AIO 360mm',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé /n/n Rainbow Six Siege préinstallé`"
        :performance="{
          rainbowSixSiege: '600+ FPS',
          valorant: '500-800 FPS',
          cs2: '500-800 FPS',
          fortnite: '500-800 FPS',
        }"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-pro/"
      />
    </div>
  </UContainer>
</template>
