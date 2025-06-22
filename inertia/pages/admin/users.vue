<script lang="ts" setup>
import { h, ref, resolveComponent, useTemplateRef } from 'vue'
import { upperFirst } from 'scule'

import { Column } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type User from '#users/models/user'

defineProps<{
  users: User[]
}>()

const table = useTemplateRef('table')
const globalFilter = ref('')

const UAvatar = resolveComponent('UAvatar')
const ULink = resolveComponent('ULink')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'userName',
    header: ({ column }) => getHeader(column, 'Utilisateur'),
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
    header: ({ column }) => getHeader(column, 'Email'),
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => getHeader(column, 'Fournisseur'),
  },
  {
    id: 'roles',
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
            'items': getRowActions(row),
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

function getRowActions(row: any) {
  const user = row.original as User
  return [
    [
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
    ],
    [
      {
        label: 'Supprimer l’utilisateur',
        icon: 'lucide:trash-2',
        color: 'error',
        onClick: () => {
          window.location.href = `/admin/votes?userId=${user.id}`
        },
      },
    ],
  ]
}

function getHeader(column: Column<User>, label: string) {
  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label: `${label}`,
    icon:
      column.getIsSorted() === 'asc'
        ? 'lucide:arrow-up-narrow-wide'
        : column.getIsSorted() === 'desc'
          ? 'lucide:arrow-down-wide-narrow'
          : 'lucide:arrow-down-up',
    onClick: () => column.toggleSorting(),
  })
}
</script>

<template>
  <div class="divide-y divide-accented flex flex-col h-screen">
    <div class="flex items-center justify-between gap-2 px-4 py-3.5">
      <h1 class="text-2xl font-bold">Calls</h1>

      <UInput
        type="search"
        icon="i-lucide-search"
        class="max-w-md min-w-xs w-full"
        placeholder="Rechercher quelques chose..."
        v-model="globalFilter"
      />

      <UDropdownMenu
        :items="
          table?.tableApi
            ?.getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(checked)
              },
              onSelect(e?: Event) {
                e?.preventDefault()
              },
            }))
        "
        :content="{ align: 'end' }"
        :ui="{ content: 'z-50' }"
      >
        <UButton
          label="Colonnes"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>

    <UTable
      ref="table"
      :data="users"
      :columns="columns"
      sticky
      class="flex-grow overflow-auto"
      v-model:global-filter="globalFilter"
    />

    <div class="px-4 py-3.5 text-sm text-muted">
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} résultats trouvés
    </div>
  </div>
</template>
