<script lang="ts" setup>
import {Head} from "@inertiajs/vue3";

import OutlinedButton from "~/components/Buttons/OutlinedButton.vue";
import MapCard from "~/components/MapCard.vue";
</script>

<template>
  <Head title="Cartes"/>

  <div class="my-16 flex flex-col justify-center items-center gap-8">
    <div class="flex flex-col justify-center items-center gap-4">
      <h1 class="text-7xl uppercase italic">Cartes</h1>
      <h3 class="font-roboto max-w-4/5 text-center">Vous êtes nouveau dans le jeu, ou vous avez encore du mal à
        apprendre les cartes et à savoir où concentrer votre attention ? Consultez ces guides de cartes pour vous aider
        à faire vos premiers pas dans Rainbow Six Siege !</h3>
    </div>

    <h2 class="text-5xl uppercase italic">OPÉRATION PREP PHASE - FILTRES DE PLAYLISTES</h2>

    <div class="flex justify-center items-center gap-4">
      <OutlinedButton label="Standard" link="/home"/>
      <OutlinedButton label="Match rapide" link="/home"/>
      <OutlinedButton label="Match a mort par équipe" link="/home"/>
      <OutlinedButton label="Ranked" link="/home"/>
    </div>
  </div>

  <div class="grid grid-cols-4 gap-4 mx-16">
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
    <MapCard href="/"
             imageSrc="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4QoneYZ2YonTyI3EcHlEmf/8fbc7c4cef551da319206536ff43ee83/stadiumB_keyart.jpg"
             name="Stade Alpha"/>
  </div>
</template>
