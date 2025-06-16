<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

import type { DropdownMenuItem, TableColumn, TabsItem } from '@nuxt/ui'
import type Marker from '#markers/models/marker'

defineProps<{
  markers: Marker[]
}>()

const UButton = resolveComponent('UButton')
const ULink = resolveComponent('ULink')
const UAvatar = resolveComponent('UAvatar')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns: TableColumn<Marker>[] = [
  {
    accessorKey: 'user.userName',
    header: 'Utilisateur',
    cell: ({ row }) => {
      const marker = row.original as Marker
      return h('div', { class: 'flex items-center gap-2' }, [
        h(UAvatar, {
          src: marker.user.avatarUrl,
          alt: marker.user.userName,
        }),
        h(ULink, { class: 'underline', to: `/membres/${marker.user.userSlug}` }, () =>
          h('span', marker.user.userName)
        ),
      ])
    },
  },
  {
    accessorKey: 'label',
    header: 'Call',
  },
  {
    accessorKey: 'map.name',
    header: 'Map - Niveau',
    cell: ({ row }) => {
      const marker = row.original as Marker
      return h(ULink, { to: `/hexacall/cartes/${marker.map.slug}`, class: 'underline' }, () =>
        h('span', marker.map.name + ' - ' + marker.stage)
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'suggestions',
    header: 'Suggestions',
    cell: ({ row }) => {
      const marker = row.original as Marker
      return h('span', marker.suggestions.length)
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Créé le',
    cell: ({ row }) => {
      const marker = row.original as Marker
      return h(
        'span',
        new Date(marker.createdAt as unknown as string).toLocaleDateString('fr-FR', {
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
  const marker = row.original as Marker
  return [
    {
      label: 'Voir ses calls',
      icon: 'lucide:map-pin',
      onClick: () => {
        window.location.href = `/admin/calls?userId=${marker.id}`
      },
    },
    {
      label: 'Voir ses suggestions',
      icon: 'lucide:message-square',
      onClick: () => {
        window.location.href = `/admin/suggestions?userId=${marker.id}`
      },
    },
    {
      label: 'Voir ses votes',
      icon: 'lucide:thumbs-up',
      onClick: () => {
        window.location.href = `/admin/votes?userId=${marker.id}`
      },
    },
  ]
}

const tabsItems = ref<TabsItem[]>([
  {
    label: 'Liste',
    icon: 'lucide:list',
    slot: 'list' as const,
  },
  {
    label: 'Images',
    icon: 'lucide:image',
    slot: 'images' as const,
  },
])

const dropItems = ref<DropdownMenuItem[]>([
  {
    label: "Supprimer l'image",
    icon: 'lucide:trash-2',
  },
])
</script>

<template>
  <div class="size-full p-6 flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Calls</h1>
      <span class="text-lg font-semibold">{{ markers.length }}</span>
    </div>

    <UTabs
      :items="tabsItems"
      :ui="{
        trigger: 'cursor-pointer',
      }"
      variant="link"
    >
      <template #list>
        <UTable :data="markers" :columns="columns" class="bg-muted rounded-lg w-full mt-4" />
      </template>
      <template #images>
        <div
          class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto"
        >
          <template v-for="marker in markers" :key="marker.id">
            <UCard
              v-for="(image, imageIndex) in marker.images"
              :key="`${marker.id}-${imageIndex}`"
              class="w-full"
              :ui="{
                body: '!p-0',
              }"
            >
              <template #header>
                <div class="flex justify-between items-center">
                  <div class="flex flex-col items-start">
                    <p class="font-semibold">{{ marker.label }}</p>
                    <p class="text-muted">{{ marker.map.name }} - {{ marker.stage }}</p>
                  </div>
                  <UDropdownMenu
                    :items="dropItems"
                    :ui="{
                      content: 'w-48',
                    }"
                  >
                    <UButton icon="lucide:ellipsis-vertical" color="neutral" variant="ghost" />
                  </UDropdownMenu>
                </div>
              </template>

              <img :src="image.url" :alt="marker.label" class="w-full h-auto object-cover" />

              <template #footer>
                <div class="flex gap-2 items-center">
                  <UAvatar :src="marker.user.avatarUrl" :alt="marker.user.userName" />
                  <div class="flex flex-col text-sm text-muted">
                    <p class="font-semibold">{{ marker.user.userName }}</p>
                    <p>{{ marker.user.email }}</p>
                  </div>
                </div>
              </template>
            </UCard>
          </template>
        </div>
      </template>
    </UTabs>
  </div>
</template>
