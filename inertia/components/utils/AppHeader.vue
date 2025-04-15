<script lang="ts" setup>
import AppButton from '~/components/utils/AppButton.vue'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import type User from '#models/user'
import { onClickOutside } from '@vueuse/core'

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Cartes', href: '/cartes' },
]

const route = computed(() => usePage().url)
const user = usePage().props.user as User

const userMenuOpen = ref(false)
const userMenuRef = ref(null)

onClickOutside(userMenuRef, () => {
  userMenuOpen.value = false
})

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}
</script>

<template>
  <div
    class="fixed top-0 z-50 w-full h-16 backdrop-blur-md bg-primary-800/50 border-b border-white/5 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 h-full grid grid-cols-3 items-center">
      <!-- Logo -->
      <div class="flex items-center justify-start">
        <a
          class="color-2xl font-bold color-white tracking-tight hover:color-white/90 transition-colors"
          href="/"
        >
          R6Calls
        </a>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-1 justify-center">
        <AppButton
          v-for="item in navItems"
          :key="item.name"
          :class="{
            'bg-white/15 color-white !rounded-full':
              (item.href === '/' && route === '/') ||
              (item.href !== '/' && route.startsWith(item.href)),
          }"
          :href="item.href"
          :label="item.name"
          class="!rounded-full px-4"
          variant="ghost"
        />
      </nav>

      <!-- User section -->
      <div class="flex items-center justify-end">
        <div v-if="user" ref="userMenuRef" class="relative">
          <button
            class="flex items-center gap-2 py-2 px-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 cursor-pointer"
            @click="toggleUserMenu"
          >
            <span class="color-white/90 font-medium hidden sm:block">{{ user.userName }}</span>
            <i
              :class="['i-mdi:chevron-down transition-transform', userMenuOpen ? 'rotate-180' : '']"
            ></i>
          </button>

          <!-- Dropdown menu -->
          <div
            v-show="userMenuOpen"
            class="absolute right-0 mt-2 w-48 py-2 bg-primary-800/50 rounded-xl shadow-lg border border-white/10 backdrop-blur-md"
          >
            <div class="px-4 py-2 border-b border-white/10">
              <p class="color-white font-medium">{{ user.userName }}</p>
              <p class="color-white/60 color-xs truncate">{{ user.email }}</p>
            </div>
            <a
              class="flex items-center gap-2 px-4 py-2 color-white/80 hover:color-white hover:bg-white/5 transition-colors"
              href="/profil"
            >
              <i class="i-mdi:account-cog"></i>
              <span>Paramètres</span>
            </a>
            <a
              class="flex items-center gap-2 px-4 py-2 color-white/80 hover:color-white hover:bg-white/5 transition-colors"
              href="/logout"
            >
              <i class="i-mdi:logout"></i>
              <span>Se déconnecter</span>
            </a>
          </div>
        </div>

        <AppButton v-else href="/login" icon="i-mdi:login" label="Se connecter" />
      </div>
    </div>
  </div>
</template>
