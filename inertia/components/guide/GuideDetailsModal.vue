<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { reactive, ref } from 'vue'
import type Guide from '#guides/models/guide'

const props = defineProps<{
  markdownContent: string
  guide?: Guide
}>()

const emit = defineEmits(['close'])

const thumbnailFile = ref<File | null>(null)
const thumbnailPreview = ref<string | null>(props.guide?.thumbnailUrl || null)

const form = reactive({
  author: props.guide?.author || '',
  title: props.guide?.title || '',
  summary: props.guide?.summary || '',
  price: props.guide?.price || 0,
  markdownContent: props.markdownContent || '',
  publishedAt: props.guide?.publishedAt || null,
})

const handleThumbnailChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    thumbnailFile.value = file
    // Créer une preview de l'image
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnailPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  // Créer un FormData pour envoyer le fichier
  const formData = new FormData()

  // Ajouter les données du formulaire
  Object.keys(form).forEach((key) => {
    const value = form[key as keyof typeof form]
    if (value !== null && value !== undefined) {
      formData.append(key, value.toString())
    }
  })

  // Ajouter le fichier thumbnail s'il existe
  if (thumbnailFile.value) {
    formData.append('thumbnail', thumbnailFile.value)
  }

  const url = props.guide ? `/p/guides/${props.guide.id}` : '/p/guides'
  const method = props.guide ? 'patch' : 'post'

  router[method](url, formData, {
    preserveState: true,
    forceFormData: true,
    onSuccess: () => {
      emit('close')
    },
  })
}
</script>

<template>
  <UModal class="z-[999]">
    <template #content>
      <div class="flex flex-col gap-6 p-6">
        <!-- Aperçu de la miniature avec placeholder -->
        <div class="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            v-if="thumbnailPreview"
            :src="thumbnailPreview"
            :alt="form.title || 'Guide thumbnail'"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600"
          >
            <div class="text-center">
              <UIcon name="lucide:image" class="w-12 h-12 mx-auto mb-2" />
              <p class="text-sm">Aucune miniature</p>
            </div>
          </div>
        </div>

        <UFormField label="Miniature" required>
          <UInput type="file" accept="image/*" class="w-full" @change="handleThumbnailChange" />
        </UFormField>

        <UFormField
          label="Titre"
          description="Attention, le titre définit l'URL de votre guide"
          required
        >
          <UInput v-model="form.title" class="w-full" placeholder="Titre" type="text" />
        </UFormField>

        <UFormField
          label="Résumé"
          description="Un résumé court de votre guide, qui sera affiché dans la liste des guides"
          required
        >
          <UInput v-model="form.summary" class="w-full" placeholder="Résumé" type="text" />
        </UFormField>

        <UFormField label="Prix" description="Si gratuit, laisser 0">
          <UInput v-model="form.price" class="w-full" placeholder="Prix" type="number" />
        </UFormField>

        <UFormField
          label="Date de publication"
          description="La date à laquelle votre guide sera publié"
        >
          <UInput
            v-model="form.publishedAt"
            class="w-full"
            placeholder="Date de publication"
            type="date"
          />
        </UFormField>

        <UFormField label="Auteur" required>
          <UInput v-model="form.author" class="w-full" placeholder="Sixquatre" type="text" />
        </UFormField>

        <UButton
          label="Sauvegarder le guide"
          icon="lucide:save"
          class="ml-auto"
          @click="handleSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
