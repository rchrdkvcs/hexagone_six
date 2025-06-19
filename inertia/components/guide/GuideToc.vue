<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  toc: string
}>()

const activeId = ref<string | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    {
      rootMargin: '0px 0px -70% 0px', // déclenche quand le haut de l'élément entre dans le viewport
      threshold: 0,
    }
  )

  const headings = document.querySelectorAll('h1, h2')
  headings.forEach((heading) => {
    observer.observe(heading)
  })
})
</script>

<template>
  <aside class="hidden md:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
    <h2 class="text-xs uppercase font-bold mb-2">Sommaire</h2>
    <nav v-html="toc" class="toc text-sm text-muted" />
  </aside>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '@nuxt/ui';

:deep(.toc ul) {
  @apply space-y-1 pl-2;
}

:deep(.toc li) {
  @apply pl-2;
}

:deep(.toc a) {
  @apply block hover:text-primary transition-colors;
}

:deep(.toc a[href='#{{ activeId }}']) {
  @apply text-primary font-medium;
}

:deep(.toc li > ul) {
  @apply ml-2 border-l border-gray-200 dark:border-gray-700 pl-2;
}
</style>
