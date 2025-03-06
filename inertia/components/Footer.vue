<script lang="ts" setup>
import DiscordIcon from "~/components/Icones/DiscordIcon.vue";
import TwitterIcon from "~/components/Icones/TwitterIcon.vue";
import InstagramIcon from "~/components/Icones/InstagramIcon.vue";
import TwitchIcon from "~/components/Icones/TwitchIcon.vue";
import {Link} from "@inertiajs/vue3";
</script>

<template>
  <footer class="relative h-16 w-full bg-[#101114] flex justify-center items-center gap-4 mt-32">
    <h2 class="font-roboto absolute left-8 text-white/75 text-sm">Suivez-moi sur mes réseaux</h2>
    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/">
      <TwitterIcon class="text-black size-6"/>
    </Link>

    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/">
      <InstagramIcon class="text-black size-6"/>
    </Link>

    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/">
      <TwitchIcon class="text-black size-6"/>
    </Link>

    <Link
      class="flex justify-center items-center p-1 rounded-full bg-white hover:bg-[#2499FF] transition-colors duration-300 ease-in-out"
      href="/">
      <DiscordIcon class="text-black size-6"/>
    </Link>
  </footer>
</template>
