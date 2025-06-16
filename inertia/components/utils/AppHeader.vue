<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUser } from '~/composables/use_user'
import { useAccess } from '~/composables/use_access'
import { onClickOutside } from '@vueuse/core'
import { router } from '@inertiajs/vue3'
import AppLogo from '~/components/utils/AppLogo.vue'

import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const user = useUser()
const navItems = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Compétition',
      icon: 'lucide:trophy',
      children: [
        {
          label: 'Lan',
          icon: 'lucide:gamepad-2',
          to: '/lan',
        },
        {
          label: 'Ranking (bientôt)',
          icon: 'lucide:bar-chart-2',
          to: '/ranking',
          disabled: true,
        },
      ],
    },
    {
      label: 'Matériel',
      icon: 'lucide:mouse',
      children: [
        {
          label: 'HexaBoost',
          icon: 'lucide:biceps-flexed',
          to: '/hexaboost',
        },
        {
          label: 'PC Clutch',
          icon: 'lucide:computer',
          to: '/pc-clutch',
        },
      ],
    },
    {
      label: 'HexaCall',
      icon: 'lucide:map-pin',
      to: '/hexacall',
    },
    {
      label: 'Guides',
      icon: 'lucide:book-open',
      to: '/guides',
      disabled: true,
      badge: {
        label: 'Bientôt',
        color: 'warning',
      },
    },
    {
      label: 'Partenaires',
      icon: 'lucide:handshake',
      to: '/partenaires',
    },
  ],
])
const profileItems = ref<DropdownMenuItem[][]>([
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
      to: '/membres/' + user.value?.userSlug,
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
const mobileMenuRef = ref<HTMLElement | null>(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

router.on('start', () => {
  isMobileMenuOpen.value = false
})

onClickOutside(mobileMenuRef, () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
})
</script>

<template>
  <header class="bg-default/75 backdrop-blur-lg border-b border-default h-16 sticky top-0 z-20">
    <UContainer class="flex items-center justify-between gap-3 h-full">
      <div class="md:flex-1 flex items-center gap-1.5">
        <ULink class="flex items-center" to="/">
          <AppLogo class="text-default" />
        </ULink>
        <UPopover
          arrow
          :ui="{
            content: 'w-64 z-20',
          }"
        >
          <UButton label="Beta" size="xs" variant="subtle" color="warning" class="rounded-full" />

          <template #content>
            <div class="p-4 space-y-2">
              <p class="text-sm text-muted">
                La version <strong> Beta </strong> est en cours de développement. Certaines
                fonctionnalités peuvent ne pas être disponibles ou comporter des bugs.
              </p>

              <p class="text-sm text-muted font-semibold">Vos retours sont précieux !</p>

              <p class="text-sm text-muted">
                N'hésitez pas à nous faire part de vos suggestions ou à signaler tout problème
                rencontré en rejoignant notre
                <ULink to="https://discord.gg/ABFsPxuYZr" class="underline text-default"
                  >discord</ULink
                >.
              </p>
            </div>
          </template>
        </UPopover>
      </div>

      <UNavigationMenu
        :items="navItems"
        content-orientation="vertical"
        variant="link"
        class="hidden md:flex"
      />

      <div class="flex items-center justify-end md:flex-1 gap-1.5">
        <UDropdownMenu
          v-if="user"
          :items="profileItems"
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

        <UButton
          size="lg"
          class="lg:hidden"
          variant="ghost"
          color="neutral"
          :icon="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
          @click="toggleMobileMenu"
        />
      </div>
    </UContainer>

    <div
      ref="mobileMenuRef"
      v-if="isMobileMenuOpen"
      class="md:hidden bg-default/90 backdrop-blur px-4 border-b border-default"
    >
      <UNavigationMenu :items="navItems" class="mb-4" orientation="vertical" variant="link" />
    </div>
  </header>

  <svg
    viewBox="0 0 1440 181"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="pointer-events-none absolute w-full top-16 transition-all text-primary shrink-0 -z-10 duration-[400ms]"
  >
    <mask id="path-1-inside-1_414_5526" fill="white"><path d="M0 0H1440V181H0V0Z"></path></mask>
    <path d="M0 0H1440V181H0V0Z" fill="url(#paint0_linear_414_5526)" fill-opacity="0.15"></path>
    <path
      d="M0 2H1440V-2H0V2Z"
      fill="url(#paint1_linear_414_5526)"
      mask="url(#path-1-inside-1_414_5526)"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_414_5526"
        x1="720"
        y1="0"
        x2="720"
        y2="181"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="currentColor" offset=""></stop>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_414_5526"
        x1="0"
        y1="90.5"
        x2="1440"
        y2="90.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="currentColor" stop-opacity="0" offset=""></stop>
        <stop offset="0.395" stop-color="currentColor"></stop>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
</template>
