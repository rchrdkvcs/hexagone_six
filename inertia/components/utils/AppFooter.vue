<script lang="ts" setup>
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const actualYear = new Date().getFullYear()

const socialLinks = ref<NavigationMenuItem[]>([
  [
    {
      icon: 'mdi:discord',
      to: 'https://discord.gg/hexagonesix',
    },
    {
      icon: 'mdi:twitter',
      to: 'https://twitter.com/hexagonesix',
    },
  ],
])

const links = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Mentions légales',
      to: '/mentions-legales',
    },
  ],
])
</script>

<template>
  <footer class="bg-default/75 backdrop-blur border-t border-default py-4 md:py-8 lg:mt-24">
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      <div class="text-center md:text-left">
        <p class="text-xl font-bold mb-1">Hexagone Six</p>
        <p class="text-muted text-sm">&copy; {{ actualYear }} Tous droits réservés</p>
      </div>

      <div class="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-8">
        <UNavigationMenu :items="socialLinks" variant="link" />
        <UNavigationMenu :items="links" variant="link" />
      </div>
    </UContainer>
  </footer>
</template>
