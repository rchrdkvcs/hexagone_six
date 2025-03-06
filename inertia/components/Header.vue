<script lang="ts" setup>
import GhostButton from "~/components/Buttons/GhostButton.vue";
import DefaultButton from "~/components/Buttons/DefaultButton.vue";
import LogoIcon from "~/components/Icones/LogoIcon.vue";
import {Link} from "@inertiajs/vue3";
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-16 bg-[#24262A]/75 flex justify-between items-center pl-8 z-999 backdrop-blur-lg">
    <Link class="hover:scale-105 transition-all ease-in-out duration-300" href="/">
      <LogoIcon/>
    </Link>
    <nav class="h-full">
      <ul class="h-full flex justify-center items-center">
        <li class="h-full">
          <GhostButton href="/a-propos" label="A Propos"/>
        </li>
        <li class="h-full">
          <GhostButton href="/cartes" label="Cartes"/>
        </li>
        <li class="h-full">
          <GhostButton href="/operateurs" label="Opératuers"/>
        </li>
      </ul>
    </nav>
    <div class="h-full">
      <DefaultButton href="/donations" label="Faire un don"/>
    </div>
  </header>
</template>
