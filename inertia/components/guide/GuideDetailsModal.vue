<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { reactive } from 'vue'

const props = defineProps<{
  markdownContent: string
}>()

const form = reactive({
  title: '',
  summary: '',
  price: 0,
  publishedAt: '',
  markdownContent: props.markdownContent,
})

const handleSubmit = () => {
  router.post('/guides', form)
}
</script>

<template>
  <UModal class="z-[999]">
    <template #content>
      <div class="flex flex-col gap-6 p-6">
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

<style scoped></style>
