<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { useUser } from '~/composables/use_user'
import { useAccess } from '~/composables/use_access'
import type { NavigationMenuItem } from '@nuxt/ui'
import AppLogo from '~/components/utils/AppLogo.vue'

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
            label: 'Mes callouts',
            icon: 'i-lucide-map-pin',
            to: '/profile/callouts',
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
</script>

<template>
  <header class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-50">
    <div class="size-full max-w-7xl mx-auto grid grid-cols-3 items-center px-4">
      <Link
        class="flex justify-start w-fit text-toned hover:text-default transition-all duration-200 ease-in-out"
        href="/"
      >
        <AppLogo class="h-5 w-fit" />
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
    </div>
  </header>
</template>
