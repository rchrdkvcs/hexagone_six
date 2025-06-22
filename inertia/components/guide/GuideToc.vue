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
      rootMargin: '0px 0px -70% 0px',
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
  <aside
    class="hidden md:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
  >
    <h2 class="text-xs uppercase font-bold mb-4 tracking-wider">Sommaire</h2>
    <nav v-html="toc" class="toc text-sm" />
  </aside>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '@nuxt/ui';

:deep(.toc ul) {
  @apply space-y-2 pl-1;
}

:deep(.toc li) {
  @apply relative;
}

:deep(.toc a) {
  @apply block py-1 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-gray-600 dark:text-gray-400;
}

:deep(.toc a[href='#{{ activeId }}']) {
  @apply text-primary font-medium bg-primary/5 dark:bg-primary/10;
  position: relative;
}

:deep(.toc a[href='#{{ activeId }}'])::before {
  content: '';
  @apply absolute left-0 top-0 h-full w-0.5 bg-primary rounded-full;
}

:deep(.toc li > ul) {
  @apply mt-1 mb-2 ml-3 pl-2 border-l border-gray-100 dark:border-gray-800;
}
</style>
