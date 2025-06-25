<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Publication from '~/layouts/publication.vue'
import EasyMDE from 'easymde'
import { marked } from 'marked'
import GuideDetailsModal from '~/components/guide/GuideDetailsModal.vue'

defineOptions({
  layout: Publication,
})

const overlay = useOverlay()
const modal = overlay.create(GuideDetailsModal)
const markdownContent = ref('')
const easyMDE = ref<EasyMDE | null>(null)

const customContainerExtension = {
  name: 'customContainer',
  level: 'block' as const,
  start(src: string) {
    const match = src.match(/^:::/)
    return match ? match.index : undefined
  },
  tokenizer(src: string) {
    const rule = /^:::(info|success|warning|tip|error)\s*\n([\s\S]*?)\n:::/
    const match = rule.exec(src)

    if (match) {
      return {
        type: 'customContainer',
        raw: match[0],
        containerType: match[1].trim(),
        text: match[2].trim(),
        tokens: [],
      }
    }
    return undefined
  },
  renderer(token: any) {
    const processedContent = marked.parse(token.text)
    return `<div class="alert alert-${token.containerType}">${processedContent}</div>`
  },
}

const configureMarked = () => {
  marked.use({ extensions: [customContainerExtension] })
  marked.setOptions({
    gfm: true,
    breaks: true,
  })
}

onMounted(() => {
  configureMarked()

  if (document.getElementById('markdown-editor')) {
    easyMDE.value = new EasyMDE({
      element: document.getElementById('markdown-editor') as HTMLElement,
      autofocus: true,
      hideIcons: ['fullscreen', 'preview'],
      uploadImage: true,
      imageUploadEndpoint: '/p/guides/files',
      imageMaxSize: 10 * 1024 * 1024,
      imageAccept: 'image/*',
      imagePathAbsolute: true,
      sideBySideFullscreen: false,
      syncSideBySidePreviewScroll: false,
      spellChecker: false,
      previewClass: 'markdown-content',
      previewRender: (plainText: string) => {
        return marked.parse(plainText)
      },
      maxHeight: '100vh',
      previewImagesInEditor: true,
    })

    easyMDE.value.codemirror.on('change', () => {
      markdownContent.value = easyMDE.value?.value() || ''
    })
  }
})
</script>

<template>
  <section class="bg-default h-screen flex flex-col overflow-hidden">
    <UButton
      label="Sauvegarder le guide"
      icon="lucide:save"
      class="top-2 right-2 fixed z-20"
      @click="modal.open({ markdownContent })"
    />

    <div class="flex-1 overflow-hidden">
      <textarea id="markdown-editor" class="w-full"></textarea>
    </div>
  </section>
</template>

<style>
@import '../../../assets/styles/easymde.css';
@import '../../../assets/styles/markdown.css';

.CodeMirror,
.editor-preview-side {
  height: auto !important;
  max-height: 100vh !important;
}

.editor-toolbar {
  position: sticky !important;
  top: 0 !important;
  z-index: 10 !important;
  background: var(--ui-bg);
}

.editor-statusbar {
  position: sticky !important;
  bottom: 0 !important;
  z-index: 10 !important;
  width: 100% !important;
  background: var(--ui-bg);
}
</style>
