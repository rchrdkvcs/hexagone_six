<script lang="ts" setup>
import { h, resolveComponent } from 'vue'

import type { TableColumn } from '@nuxt/ui'
import type Suggestion from '#suggestions/models/suggestion'

const props = defineProps<{
  suggestions: Suggestion[]
}>()


const UButton = resolveComponent('UButton')
const ULink = resolveComponent('ULink')
const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns: TableColumn<Suggestion>[] = [
  {
    accessorKey: 'userName',
    header: 'Utilisateur',
    cell: ({ row }) => {
      const suggestion = row.original as Suggestion
      return h('div', { class: 'flex items-center gap-2' }, [
        h(UAvatar, {
          src: suggestion.user.avatarUrl,
          alt: suggestion.user.userName,
        }),
        h(ULink, { class: 'underline', to: `/membres/${suggestion.user.userSlug}` }, () =>
          h('span', suggestion.user.userName)
        ),
      ])
    },
  },
  {
    accessorKey: 'label',
    header: 'Suggestion',
    cell: ({ row }) => {
      const suggestion = row.original as Suggestion
      return h('div', { class: 'flex items-center gap-1' }, [
        h('span', { class: 'font-semibold' }, suggestion.label),
        suggestion.label === suggestion.marker.label &&
          h(
            UBadge,
            { color: 'success', variant: 'subtle', size: 'sm', class: 'rounded-full' },
            () => h('span', 'Actif')
          ),
      ])
    },
  },
  {
    header: 'Map - Niveau',
    cell: ({ row }) => {
      const suggestion = row.original as Suggestion
      return h(
        ULink,
        { to: `/hexacall/cartes/${suggestion.marker.map.slug}`, class: 'underline' },
        () => h('span', suggestion.marker.map.name + ' - ' + suggestion.marker.stage)
      )
    },
  },
  {
    header: 'Votes',
    cell: ({ row }) => {
      const suggestion = row.original as Suggestion
      return h('div', { class: 'flex items-center gap-2' }, [
        h(UBadge, { color: 'success', variant: 'subtle' }, () =>
          h('span', suggestion.upVote.toString())
        ),
        h('span', suggestion.voteRatio.toString()),
        h(UBadge, { color: 'error', variant: 'subtle' }, () =>
          h('span', suggestion.downVote.toString())
        ),
      ])
    },
  },
  {
    header: 'Créé le',
    cell: ({ row }) => {
      const suggestion = row.original as Suggestion
      return h(
        'span',
        new Date(suggestion.createdAt as unknown as string).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      )
    },
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
  const suggestion = row.original as Suggestion
  return [
    {
      label: 'Voir ses calls',
      icon: 'lucide:map-pin',
      onClick: () => {
        window.location.href = `/admin/suggestions/${suggestion.id}/calls`
      },
    },
  ]
}
</script>

<template>
  <div class="size-full p-6 flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Suggestions</h1>
      <span class="text-lg font-semibold">{{ suggestions.length }}</span>
    </div>
    <UTable :data="suggestions" :columns="columns" class="bg-muted rounded-lg w-full" />
  </div>
</template>
