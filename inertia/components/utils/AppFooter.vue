<script lang="ts" setup>
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const actualYear = new Date().getFullYear()

const socialLinks = ref<NavigationMenuItem[]>([
  [
    {
      icon: 'mdi:discord',
      to: 'https://discord.gg/hexacalls',
    },
    {
      icon: 'mdi:twitter',
      to: 'https://twitter.com/hexacalls',
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
  <footer class="bg-default/75 backdrop-blur border-t border-default py-8">
    <UContainer class="flex justify-between items-center">
      <div>
        <p class="text-xl font-bold mb-1">HexaCalls</p>
        <p class="text-muted text-sm">&copy; {{ actualYear }} Tous droits réservés</p>
      </div>

      <UNavigationMenu :items="socialLinks" variant="link" />

      <UNavigationMenu :items="links" variant="link" />
    </UContainer>
  </footer>
</template>
