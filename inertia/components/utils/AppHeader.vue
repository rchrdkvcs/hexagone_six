<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUser } from '~/composables/use_user'
import { useAccess } from '~/composables/use_access'
import AppLogo from '~/components/utils/AppLogo.vue'

import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

const user = useUser()

const navItems = ref<NavigationMenuItem[]>([
  [
    {
      slot: 'logo' as const,
    },
  ],
  [
    {
      label: 'HexaCall',
      icon: 'lucide:map',
      to: '/cartes',
    },
    {
      label: 'Lan',
      icon: 'lucide:computer',
      to: '/lan',
    },
    {
      label: 'Matériel',
      icon: 'lucide:headphones',
      to: '/materiel',
    },
    {
      label: 'HexaOpti',
      icon: 'lucide:biceps-flexed',
      to: '/hexaopti',
    },
    {
      label: 'Partenaires',
      icon: 'lucide:handshake',
      to: '/partenaires',
    },
  ],
  [
    {
      slot: 'profile' as const,
    },
  ],
])

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value?.userName,
      avatar: {
        src: user.value?.avatarUrl,
      },
      type: 'label',
      class: 'capitalize',
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      to: '/membres/' + user.value?.userName,
    },
    {
      label: 'Paramètres',
      icon: 'i-lucide-cog',
      to: '/settings',
    },
    {
      label: 'Administration',
      icon: 'i-lucide-shield-check',
      to: '/admin',
      class: computed(() => {
        return useAccess() > 2 ? '' : 'hidden'
      }),
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      to: '/logout',
      color: 'error',
    },
  ],
])

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-20">
    <div class="size-full max-w-7xl mx-auto items-center px-4">
      <UNavigationMenu
        :items="navItems"
        content-orientation="vertical"
        variant="link"
        class="items-center h-full"
      >
        <template #logo>
          <ULink
            class="flex justify-start items-center gap-2 w-fit text-toned hover:text-default transition-all duration-200 ease-in-out"
            to="/"
          >
            <AppLogo />
          </ULink>
        </template>

        <template #profile>
          <UDropdownMenu
            v-if="user"
            :items="items"
            :ui="{
              content: 'w-48 z-20',
            }"
          >
            <UButton color="neutral" variant="ghost" class="py-1 px-2 rounded-full">
              <UAvatar :src="user.avatarUrl" :alt="user.userName" size="md" />
              <span class="capitalize">{{ user.userName }}</span>
            </UButton>
          </UDropdownMenu>

          <UButton
            v-else
            variant="subtle"
            color="neutral"
            label="Se connecter"
            icon="lucide:log-in"
            to="/login"
          />
        </template>
      </UNavigationMenu>

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
      class="md:hidden bg-default/90 backdrop-blur px-4 border-b border-default"
    >
      <div class="border-b border-default">
        <UNavigationMenu :items="profileItems" content-orientation="vertical" variant="link">
          <template #profile>
            <div
              v-if="user"
              class="flex items-center gap-2 cursor-pointer transition-all ease-in-out duration-200"
            >
              <UAvatar :src="user.avatarUrl" :alt="user.userName" size="md" />
              <span class="capitalize">{{ user.userName }}</span>
            </div>

            <UButton
              v-else
              variant="subtle"
              label="Se connecter"
              icon="lucide:log-in"
              to="/login"
            />
          </template>
        </UNavigationMenu>
      </div>

      <UNavigationMenu
        :items="navItems"
        class="mb-4"
        content-orientation="vertical"
        variant="link"
      />
    </div>
  </header>
</template>
