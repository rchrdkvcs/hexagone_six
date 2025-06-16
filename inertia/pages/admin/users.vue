<script lang="ts" setup>
import { h, resolveComponent } from 'vue'

import type { TableColumn } from '@nuxt/ui'
import type User from '#users/models/user'

defineProps<{
  users: User[]
}>()
const UAvatar = resolveComponent('UAvatar')
const ULink = resolveComponent('ULink')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'userName',
    header: 'Utilisateur',
    cell: ({ row }) => {
      const user = row.original as User
      return h('div', { class: 'flex items-center gap-2' }, [
        h(UAvatar, {
          src: user.avatarUrl,
          alt: user.userName,
        }),
        h(ULink, { class: 'underline', to: `/membres/${user.userSlug}` }, () =>
          h('span', user.userName)
        ),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'provider',
    header: 'Fournisseur',
  },
  {
    accessorKey: 'roles',
    header: 'Rôles',
    cell: ({ row }) => {
      const user = row.original as User
      return h(
        'div',
        { class: 'flex flex-wrap gap-2' },
        user.roles.map((role) =>
          h(
            UBadge,
            {
              color: 'neutral',
              variant: 'subtle',
              class: 'text-xs rounded-full',
            },
            () => h('span', role)
          )
        )
      )
    },
  },
  {
    accessorKey: 'bio',
    header: 'Bio',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end',
            },
            'items': getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto',
              'aria-label': 'Actions dropdown',
            })
        )
      )
    },
  },
]

function getRowItems(row: any) {
  const user = row.original as User
  return [
    {
      label: 'Voir ses calls',
      icon: 'lucide:map-pin',
      onClick: () => {
        window.location.href = `/admin/calls?userId=${user.id}`
      },
    },
    {
      label: 'Voir ses suggestions',
      icon: 'lucide:message-square',
      onClick: () => {
        window.location.href = `/admin/suggestions?userId=${user.id}`
      },
    },
    {
      label: 'Voir ses votes',
      icon: 'lucide:thumbs-up',
      onClick: () => {
        window.location.href = `/admin/votes?userId=${user.id}`
      },
    },
  ]
}
</script>

<template>
  <div class="size-full p-6 flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Utilisateurs</h1>
      <span class="text-lg font-semibold">{{ users.length }}</span>
    </div>
    <UTable :data="users" :columns="columns" class="bg-muted rounded-lg w-full" />
  </div>
</template>
