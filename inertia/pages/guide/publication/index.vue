<script setup lang="ts">
import { reactive } from 'vue'
import { router } from '@inertiajs/vue3'

const form = reactive({
  title: '',
  summary: '',
  price: null,
  isPublished: false,
  markdownContent: '',
})

const handleSubmit = () => {
  router.post('/guides', form)
}
</script>

<template>
  <section class="bg-default w-full h-screen">
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Publish a Guide</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="form.title"
            type="text"
            id="title"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price (€)</label>
          <input
            v-model="form.price"
            type="number"
            id="price"
            min="0"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center mb-4">
          <input
            v-model="form.isPublished"
            type="checkbox"
            id="isPublished"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="isPublished" class="ml-2 block text-sm text-gray-700"
            >Publish Immediately</label
          >
        </div>
        <div>
          <label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            v-model="form.summary"
            id="summary"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label for="markdownContent" class="block text-sm font-medium text-gray-700"
            >Markdown Content</label
          >
          <textarea
            v-model="form.markdownContent"
            id="markdownContent"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Publish Guide
        </button>
      </form>
    </div>
  </section>
</template>
