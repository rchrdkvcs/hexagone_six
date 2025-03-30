<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import TwitterIcon from '~/components/Icones/TwitterIcon.vue'
import InstagramIcon from '~/components/Icones/InstagramIcon.vue'
import TwitchIcon from '~/components/Icones/TwitchIcon.vue'
import DiscordIcon from '~/components/Icones/DiscordIcon.vue'
</script>

<template>
  <main class="min-h-screen h-screen w-full text-white mx-auto max-w-[1920px]">
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

body {
  background:
    url(/images/bg-layer-1.png) 100% 0 no-repeat fixed,
    url(/images/bg-layer-2.png) 0 0 no-repeat fixed,
    url(/images/bg-layer-3.png) 100% 100% no-repeat fixed,
    url(/images/bg-layer-4.png) 0 100% no-repeat fixed,
    url('/images/background.jpg') 50% 50% repeat-y fixed;
  background-color: #1b2036;
}

* > * {
  font-family: 'Roboto', sans-serif;
}
</style>
