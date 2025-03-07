<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<template>
  <Header />

  <main class="pt-16 min-h-screen h-full w-full text-white">
    <slot />
  </main>

  <Footer />
</template>

<style>
@import url('../styles/fonts.css');

body {
  background:
    url(../assets/images/bg-layer-1.png) 100% 0 no-repeat fixed,
    url(../assets/images/bg-layer-2.png) 0 0 no-repeat fixed,
    url(../assets/images/bg-layer-3.png) 100% 100% no-repeat fixed,
    url(../assets/images/bg-layer-4.png) 0 100% no-repeat fixed,
    url('../assets/images/background.jpg') 50% 50% repeat-y fixed;
}
</style>
