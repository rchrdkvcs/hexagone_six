<script setup lang="ts">
import type Guide from '#guides/models/guide'
import { h, ref, resolveComponent, useTemplateRef } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { Column } from '@tanstack/vue-table'
import Publication from '~/layouts/publication.vue'
import { router } from '@inertiajs/vue3'

defineProps<{
  guides: Guide[]
}>()

defineOptions({
  layout: Publication,
})

const table = useTemplateRef('table')
const globalFilter = ref('')

const ULink = resolveComponent('ULink')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns: TableColumn<Guide>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => getHeader(column, 'Titre'),
    cell: ({ row }) => {
      const guide = row.original as Guide
      return h(ULink, { to: `/guides/${guide.slug}`, class: 'underline' }, () =>
        h('span', guide.title)
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => getHeader(column, 'Prix'),
    cell: ({ row }) => {
      const guide = row.original as Guide
      return h('span', guide.price != 0 ? `${guide.price} €` : 'Gratuit')
    },
  },
  {
    accessorKey: 'publishedAt',
    header: ({ column }) => getHeader(column, 'Statut'),
    cell: ({ row }) => {
      const guide = row.original as Guide
      const isPublished =
        guide.publishedAt && new Date(guide.publishedAt as unknown as string) <= new Date()
      return h(
        UBadge,
        {
          color: isPublished ? 'success' : 'neutral',
          variant: 'subtle',
        },
        () => h('span', isPublished ? 'Publié' : 'Non publié')
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => getHeader(column, 'Créé le'),
    cell: ({ row }) => {
      const guide = row.original as Guide
      return h('span', new Date(guide.createdAt as unknown as string).toLocaleDateString('fr-FR'))
    },
  },
  {
    accessorKey: 'publishedAt',
    header: ({ column }) => getHeader(column, 'Publication'),
    cell: ({ row }) => {
      const guide = row.original as Guide
      const isPublished =
        guide.publishedAt && new Date(guide.publishedAt as unknown as string) <= new Date()
      return h(
        'span',
        isPublished
          ? new Date(guide.publishedAt as unknown as string).toLocaleDateString('fr-FR')
          : 'Prévue pour le ' +
              new Date(guide.publishedAt as unknown as string).toLocaleDateString('fr-FR')
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
  const guide = row.original as Guide
  return [
    [
      {
        label: 'Voir la publication',
        icon: 'lucide:eye',
        to: `/guides/${guide.slug}`,
      },
      {
        label: 'Modifier la publication',
        icon: 'lucide:pencil',
        to: `/p/guides/${guide.id}`,
      },
    ],
    [
      {
        label: 'Supprimer la publication',
        icon: 'lucide:trash',
        onClick: () => {
          if (confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
            router.delete(`/p/guides/${guide.id}`)
          }
        },
        color: 'error',
      },
    ],
  ]
}

function getHeader(column: Column<Guide>, label: string) {
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
  <section class="bg-default w-full h-screen">
    <div class="divide-y divide-accented flex flex-col h-screen">
      <div class="flex items-center justify-between gap-2 px-4 py-3.5">
        <div class="flex items-center gap-2">
          <UButton icon="lucide:arrow-left" to="/guides" color="neutral" variant="ghost" />
          <h1 class="text-2xl font-bold">Publications</h1>
        </div>

        <UInput
          type="search"
          icon="i-lucide-search"
          class="max-w-md min-w-xs w-full"
          placeholder="Rechercher une publication..."
          v-model="globalFilter"
          size="lg"
        />

        <UButton label="Crée une publication" icon="lucide:plus" to="/p/guides/ajouter" />
      </div>

      <UTable
        ref="table"
        :data="guides"
        :columns="columns"
        sticky
        class="flex-grow overflow-auto"
        v-model:global-filter="globalFilter"
      />

      <div class="px-4 py-3.5 text-sm text-muted">
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} résultats trouvés
      </div>
    </div>
  </section>
</template>
