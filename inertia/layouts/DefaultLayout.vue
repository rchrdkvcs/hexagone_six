<script lang="ts" setup>
import TwitterIcon from '~/components/Icones/TwitterIcon.vue'
import TwitchIcon from '~/components/Icones/TwitchIcon.vue'
import InstagramIcon from '~/components/Icones/InstagramIcon.vue'
import DiscordIcon from '~/components/Icones/DiscordIcon.vue'
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
</script>

<template>
  <nav
    class="top-4 left-1/2 -translate-x-1/2 fixed z-999 h-16 w-fit bg-#24262A/50 backdrop-blur-lg flex justify-center items-center gap-4 border border-white/15 rounded-xl p-2"
  >
    <ul class="h-full flex justify-center items-center gap-2">
      <li>
        <Link
          :class="[
            page.url === '/' ? 'bg-white/15 color-white/100' : 'color-white/80 bg-transparent',
          ]"
          class="relative px-3 py-3 font-medium border border-transparent hover:(bg-white text-black border-white/15) rounded-lg transition-colors duration-300 ease-in-out"
          href="/"
        >
          Accueil
        </Link>
      </li>
      <li>
        <Link
          :class="[
            page.url.startsWith('/cartes')
              ? 'bg-white/15 color-white/100'
              : 'color-white/80 bg-transparent',
          ]"
          class="relative px-3 py-3 font-medium border border-transparent hover:(bg-white text-black border-white/15) rounded-lg transition-colors duration-300 ease-in-out"
          href="/cartes"
        >
          Cartes
        </Link>
      </li>
    </ul>
  </nav>

  <main class="pt-16 min-h-screen h-full w-full text-white max-w-[1440px] mx-auto">
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
