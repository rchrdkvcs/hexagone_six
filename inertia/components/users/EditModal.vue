<script lang="ts" setup>
import { onMounted } from 'vue'
import { useForm } from '@inertiajs/vue3'

import type User from '#users/models/user'

const props = defineProps<{ user: User }>()

onMounted(() => {
  form.userName = props.user.userName
  form.bio = props.user.bio
})

const form = useForm({
  userName: '',
  bio: '',
})
</script>

<template>
  <UModal :open="true" title="Modifier mes informations" @close="$emit('close')">
    <template #body>
      <form
        id="edit-user-form"
        class="flex flex-col gap-4"
        @submit.prevent="form.post('/membres/' + user.id)"
      >
        <UFormField :error="form.errors.userName" label="Nom d'utilisateur" name="userName">
          <UInput v-model="form.userName" :placeholder="user.userName" class="w-full" />
        </UFormField>

        <UFormField :error="form.errors.bio" label="Biographie" name="bio">
          <UTextarea v-model="form.bio" :placeholder="user.bio" class="w-full" type="textarea" />
        </UFormField>
      </form>
    </template>

    <template #footer>
      <UButton
        :disabled="form.processing"
        :loading="form.processing"
        class="ml-auto cursor-pointer"
        color="neutral"
        form="edit-user-form"
        icon="lucide:save"
        label="Enregistrer"
        type="submit"
      />
    </template>
  </UModal>
</template>
