<script lang="ts" setup>
import GhostButton from '~/components/Buttons/GhostButton.vue'
import LogoIcon from '~/components/Icones/LogoIcon.vue'
import DefaultButton from '~/components/Buttons/DefaultButton.vue'
import TwitterIcon from '~/components/Icones/TwitterIcon.vue'
import TwitchIcon from '~/components/Icones/TwitchIcon.vue'
import InstagramIcon from '~/components/Icones/InstagramIcon.vue'
import DiscordIcon from '~/components/Icones/DiscordIcon.vue'
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-16 bg-#24262A/75 flex justify-between items-center pl-8 backdrop-blur-lg z-100"
  >
    <Link class="hover:scale-105 transition-all ease-in-out duration-300" href="/">
      <LogoIcon />
    </Link>
    <nav class="h-full">
      <ul class="h-full flex justify-center items-center">
        <li class="h-full">
          <GhostButton href="/a-propos" label="A Propos" />
        </li>
        <li class="h-full">
          <GhostButton href="/cartes" label="Cartes" />
        </li>
      </ul>
    </nav>
    <div class="h-full">
      <DefaultButton href="/donations" label="Faire un don" />
    </div>
  </header>

  <main class="pt-16 min-h-screen h-full w-full text-white">
    <slot />
  </main>

  <footer class="relative h-16 w-full bg-[#101114] flex justify-center items-center gap-4 mt-32">
    <h2 class="font-roboto absolute left-8 text-white/75 text-sm">Suivez-moi sur mes réseaux</h2>
    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/"
    >
      <TwitterIcon class="text-black size-6" />
    </Link>

    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/"
    >
      <InstagramIcon class="text-black size-6" />
    </Link>

    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/"
    >
      <TwitchIcon class="text-black size-6" />
    </Link>

    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/"
    >
      <DiscordIcon class="text-black size-6" />
    </Link>
  </footer>
</template>

<style>
@import url('../styles/fonts.css');

body {
  background:
    url(/images/bg-layer-1.png) 100% 0 no-repeat fixed,
    url(/images/bg-layer-2.png) 0 0 no-repeat fixed,
    url(/images/bg-layer-3.png) 100% 100% no-repeat fixed,
    url(/images/bg-layer-4.png) 0 100% no-repeat fixed,
    url('/images/background.jpg') 50% 50% repeat-y fixed;
}

.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>
