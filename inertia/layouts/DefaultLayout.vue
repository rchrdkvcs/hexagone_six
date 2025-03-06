<script lang="ts" setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <Header/>

  <main class="pt-16 min-h-screen h-full w-full text-white">
    <slot/>
  </main>

  <Footer/>
</template>

<style scoped>

</style>
