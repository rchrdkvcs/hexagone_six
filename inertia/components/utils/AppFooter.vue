<script lang="ts" setup>
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const actualYear = new Date().getFullYear()

const socialLinks = ref<NavigationMenuItem[]>([
  [
    {
      icon: 'lucide:circle-help',
      label: 'Aide',
      to: '/aide',
    },
    {
      icon: 'simple-icons:discord',
      label: 'Discord',
      to: 'https://discord.gg/ABFsPxuYZr',
    },
    {
      icon: 'simple-icons:x',
      label: 'Twitter',
      to: 'https://x.com/hexagonesix',
    },
  ],
])

// const links = ref<NavigationMenuItem[]>([
//   [
//     {
//       label: 'Mentions légales',
//       to: '/mentions-legales',
//     },
//   ],
// ])
</script>

<template>
  <footer class="bg-default border-t border-default py-4 md:py-8">
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      <div class="text-left flex items-center space-x-4">
        <img
          src="/public/images/app_logo.webp"
          alt="Logo Hexagone Six"
          class="size-8 md:size-16 mb-2"
          width="184"
          height="192"
        />
        <div>
          <p class="text-xl font-bold mb-1">Hexagone Six</p>
          <p class="text-muted text-sm">&copy; {{ actualYear }} Tous droits réservés</p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-8">
        <UNavigationMenu :items="socialLinks" variant="link" />
        <!--        <UNavigationMenu :items="links" variant="link" />-->
      </div>
    </UContainer>
  </footer>
</template>
