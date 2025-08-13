<script setup lang="ts">
import PcCard from '~/components/materials/PcCard.vue'
</script>

<template>
  <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
    <div class="space-y-2 px-4 md:px-0 z-0">
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
      >
        Des PC conçus pour Rainbow Six : Siege X
      </h2>

      <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Découvrez notre sélection d’ordinateurs puissants conçus pour vous donner l’avantage sur
        Rainbow Six Siege et tous vos jeux compétitifs préférés.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
      <PcCard
        name="Clutch X Core"
        description="Le point d’entrée sérieux dans la performance."
        price="989.99 €"
        imageUrl="/public/images/materials_clutch-x.webp"
        :config="{
          cpu: 'AMD Ryzen 5 7600',
          mb: 'MSI PRO B650M-P',
          gpu: 'MSI RTX 5060 8 Go VENTUS 2X OC',
          ram: '16 Go DDR5 5200 MHz CL40',
          storage: ' 1 To NVMe Crucial E100',
          cooling: 'DeepCool AG200',
          pu: 'MSI MAG A500N-H',
          case: 'Cooler Master TD300 Mini',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé, Windows optimisé, Rainbow Six Siege préinstallé`"
        :performance="[
          'Jouez fluide en 1080p avec des réglages compétitifs.',
          'Optimisé pour la stabilité & la réactivité.',
          'Une expérience nette, propre, sans surchauffe ni latence parasite.',
        ]"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-core/"
      />

      <PcCard
        name="Clutch X Pro"
        description="L’équilibre parfait pour monter en niveau."
        price="1189,99 €"
        imageUrl="/public/images/materials_clutch-x.webp"
        :config="{
          cpu: 'AMD Ryzen 5 9600X',
          mb: 'MSI PRO B650M-P',
          gpu: 'MSI RTX 5060 Ti 8 Go VENTUS 2X OC',
          ram: '16 Go DDR5 5200 MHz CL40',
          storage: ' 1 To NVMe Crucial E100',
          cooling: 'Zephyr Dark Pro',
          pu: 'M-RED 550W',
          case: 'Cooler Master TD300 Mini',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé, Windows optimisé, Rainbow Six Siege préinstallé`"
        :performance="[
          'Réactivité accrue, multitâche fluide, stabilité sur le long terme.',
          'Idéal pour le grind ranked et les longues sessions.',
          'Aucun ralentissement, même en pic de charge.',
        ]"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-pro/"
      />

      <PcCard
        name="Clutch X Ultra"
        description="Le PC des joueurs compétitifs exigeants."
        price="1569,99 €"
        imageUrl="/public/images/materials_clutch-x-ultra.webp"
        :config="{
          cpu: 'AMD Ryzen 7 7800X3D',
          mb: 'MSI PRO B650-S WIFI',
          gpu: 'MSI RTX 5060 Ti 16 Go VENTUS 2X OC',
          ram: '32 Go DDR5 6000 MHz CL30',
          storage: ' 1 To NVMe Crucial E100',
          cooling: 'Zephyr Dark Pro (TDP 240W)',
          pu: 'MSI MAG A750GL PCIe 5 – 750W',
          case: 'MSI MPG GUNGNIR 110R',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé, Rainbow Six Siege préinstallé`"
        :performance="[
          'Fluidité constante sur Siege X et sur les jeux les plus exigeantes.',
          'Temps de réponse système réduit à l’extrême.',
          'Config validée pour la compétition.',
        ]"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-ultra/"
      />

      <PcCard
        name="Clutch X Ultra Pro"
        description="Le monstre ultime."
        price="1899,99 €"
        imageUrl="/public/images/materials_clutch-x-ultra.webp"
        :config="{
          cpu: 'AMD Ryzen 7 9800X3D',
          mb: 'MSI PRO B650-S WIFI',
          gpu: 'MSI RTX 5070 12 Go VENTUS 2X',
          ram: '32 Go DDR5 6000 MHz CL30',
          storage: '1 To NVMe Crucial E100',
          cooling: 'MSI MAG AIO 360mm',
          pu: 'MSI MAG A750GL 750W 80+ Gold',
          case: 'MSI MPG GUNGNIR 110R',
        }"
        :sub-description="`Windows 11 (version d’essai) préinstallé, Rainbow Six Siege préinstallé`"
        :performance="[
          'Machine taillée pour la performance extrême.',
          'Parfait pour le multitâche lourd : jeu + stream + enregistrement + overlay.',
          'Latence minimale, silence maîtrisé, aucune concession.',
        ]"
        link="https://www.hardwaremodding.fr/product/pc-gamer-clutch-x-ultra-pro/"
      />
    </div>
  </UContainer>
</template>
