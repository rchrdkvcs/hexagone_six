<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  toc: string
}>()

const activeId = ref<string>('')
const tocContainer = ref<HTMLElement>()

const extractTocIds = (tocHtml: string): string[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(tocHtml, 'text/html')
  const links = doc.querySelectorAll('a[href^="#"]')
  return Array.from(links).map((link) =>
    decodeURIComponent((link as HTMLAnchorElement).href.split('#')[1])
  )
}

const findActiveSection = (ids: string[]): string => {
  let activeId = ''
  let closestDistance = Infinity

  for (const id of ids) {
    const element = document.getElementById(id)
    if (element) {
      const rect = element.getBoundingClientRect()
      const distance = Math.abs(rect.top - 100)

      if (distance < closestDistance && rect.top <= 200) {
        closestDistance = distance
        activeId = id
      }
    }
  }

  return activeId
}

const updateActiveLinks = (currentActiveId: string) => {
  if (!tocContainer.value) return

  const allLinks = tocContainer.value.querySelectorAll('a')
  allLinks.forEach((link) => {
    link.classList.remove('active-link', 'parent-active')
  })

  if (currentActiveId) {
    const activeLink = tocContainer.value.querySelector(
      `a[href="#${encodeURIComponent(currentActiveId)}"]`
    )
    if (activeLink) {
      activeLink.classList.add('active-link')

      let parent = activeLink.closest('li')?.parentElement?.closest('li')
      while (parent) {
        const parentLink = parent.querySelector(':scope > p > a, :scope > a')
        if (parentLink) {
          parentLink.classList.add('parent-active')
        }
        parent = parent.parentElement?.closest('li')
      }
    }
  }
}

let tocIds: string[] = []
const handleScroll = () => {
  const newActiveId = findActiveSection(tocIds)
  if (newActiveId !== activeId.value) {
    activeId.value = newActiveId
    updateActiveLinks(newActiveId)
  }
}

const handleLinkClick = (event: Event) => {
  const target = event.target as HTMLAnchorElement
  if (target.tagName === 'A' && target.href.includes('#')) {
    const id = decodeURIComponent(target.href.split('#')[1])
    const element = document.getElementById(id)
    if (element) {
      event.preventDefault()
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setTimeout(() => {
        activeId.value = id
        updateActiveLinks(id)
      }, 100)
    }
  }
}

onMounted(() => {
  tocIds = extractTocIds(props.toc)

  window.addEventListener('scroll', handleScroll, { passive: true })
  if (tocContainer.value) {
    tocContainer.value.addEventListener('click', handleLinkClick)
  }

  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (tocContainer.value) {
    tocContainer.value.removeEventListener('click', handleLinkClick)
  }
})
</script>

<template>
  <aside
    class="hidden md:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
  >
    <h2 class="text-sm text-muted font-medium mb-4 tracking-wider">Sommaire</h2>
    <nav ref="tocContainer" v-html="toc" class="toc text-sm" />
  </aside>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '@nuxt/ui';

:deep(.toc ul) {
  @apply space-y-1.5 pl-1;
}

:deep(.toc li) {
  @apply relative;
}

:deep(.toc a) {
  @apply block py-1.5 px-3 rounded-md text-muted hover:bg-muted hover:text-highlighted transition duration-200 ease-in-out;
}

:deep(.toc a.active-link) {
  @apply text-primary font-medium;
}

:deep(.toc a.parent-active) {
  @apply font-medium;
}

:deep(.toc li > ul) {
  @apply mt-1 mb-2 ml-4 pl-1.5 border-l border-default;
}
</style>
