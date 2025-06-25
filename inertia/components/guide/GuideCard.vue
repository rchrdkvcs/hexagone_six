<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type Guide from '#guides/models/guide'

defineProps<{
  guide: Guide
}>()
</script>

<template>
  <Link
    :href="`/guides/${guide.slug}`"
    class="w-full h-fit bg-muted ring ring-default rounded-lg flex overflow-hidden group transition duration-200 ease-in-out hover:bg-accented hover:shadow-lg"
  >
    <div class="relative">
      <UBadge
        v-if="
          guide.publishedAt &&
          new Date(guide.publishedAt as unknown as string) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        "
        label="Nouveau"
        variant="subtle"
        color="neutral"
        class="size-fit rounded-full absolute top-2 left-2 z-10"
      />
      <img
        :src="guide.thumbnailUrl || '/public/images/guide/1.jpg'"
        :alt="guide.title"
        class="object-cover h-full w-auto [mask-image:linear-gradient(to_right,black_40%,transparent_95%)] group-hover:scale-105 transition duration-400 ease-in-out"
      />
    </div>
    <div class="flex flex-col gap-2 w-full p-4 pl-0">
      <div class="flex flex-col gap-1">
        <h3 class="text-lg font-semibold line-clamp-1">{{ guide.title }}</h3>
        <p class="text-muted line-clamp-3">{{ guide.summary }}</p>
      </div>
      <div class="flex items-center justify-between mt-auto border-t border-default pt-4">
        <span class="text-xs text-muted"
          >Publié le
          {{
            guide.publishedAt &&
            new Date(guide.publishedAt as unknown as string).toLocaleDateString('fr-FR')
          }}</span
        >
        <UBadge
          :label="guide.price != 0 ? `${guide.price} €` : 'Gratuit'"
          :color="guide.price != 0 ? 'neutral' : 'success'"
          variant="subtle"
          class="size-fit"
        />
      </div>
    </div>
  </Link>
</template>
