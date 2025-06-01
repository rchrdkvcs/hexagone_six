<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { useUser } from '~/composables/use_user'
import { useAccess } from '~/composables/use_access'
import AppLogo from '~/components/utils/AppLogo.vue'

import type { NavigationMenuItem } from '@nuxt/ui'

const user = useUser()

const navItems = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Cartes',
      icon: 'lucide:map',
      to: '/cartes',
    },
  ],
])

const profileItems = computed<NavigationMenuItem[]>(() => [
  {
    label: user.value ? user.value.userName : 'Se connecter',
    icon: user.value ? 'i-lucide-user' : 'i-lucide-log-in',
    to: user.value ? '' : '/login',
    children: user.value
      ? [
          ...(useAccess() >= 2
            ? [
                {
                  label: 'Administration',
                  icon: 'i-lucide-shield-check',
                  to: '/admin',
                },
              ]
            : []),
          {
            label: 'Mon profil',
            icon: 'lucide:user',
            to: '/membres/' + user.value?.userName,
          },
          {
            label: 'Déconnexion',
            icon: 'i-lucide-log-out',
            to: '/logout',
          },
        ]
      : undefined,
  },
])

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-50">
    <div class="size-full max-w-7xl mx-auto grid md:grid-cols-3 grid-cols-2 items-center px-4">
      <Link
        class="flex justify-start items-center gap-2 w-fit text-toned hover:text-default transition-all duration-200 ease-in-out"
        href="/"
      >
        <AppLogo />
      </Link>

      <UNavigationMenu
        :items="navItems"
        class="w-full justify-center hidden md:flex"
        content-orientation="vertical"
        variant="link"
      />

      <UNavigationMenu
        :items="profileItems"
        class="w-full justify-end hidden md:flex"
        content-orientation="vertical"
        variant="link"
      />

      <div class="flex md:hidden justify-end">
        <UButton
          :icon="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          color="neutral"
          variant="ghost"
          size="xl"
          @click="toggleMobileMenu"
        />
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-default/90 backdrop-blur p-4 border-b border-default"
    >
      <UNavigationMenu
        :items="navItems"
        class="mb-4"
        content-orientation="vertical"
        variant="link"
      />
      <UNavigationMenu :items="profileItems" content-orientation="vertical" variant="link" />
    </div>
  </header>
</template>
