<script lang="ts" setup>
import AppButton from '~/components/utils/AppButton.vue'
import { usePage } from '@inertiajs/vue3'
import type User from '../../../../app/users/models/user'
import { ref } from 'vue'
import AuthModal from '~/components/AuthModal.vue'

defineProps<{
  showAllSuggestions: boolean
  hasSuggestions: boolean
}>()

const emit = defineEmits(['view-all', 'add-suggestion'])

const user = usePage().props.user as User
const authPopup = ref(false)

const handleSuggestSubmit = () => {
  if (user) {
    emit('add-suggestion')
  } else {
    authPopup.value = true
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <AppButton
      v-if="!showAllSuggestions && hasSuggestions"
      icon="i-mdi:format-list-bulleted"
      label="Voir toutes les suggestions"
      variant="secondary"
      @click="$emit('view-all')"
    />

    <AppButton icon="i-mdi:add" label="Faire une suggestion" @click="handleSuggestSubmit">
      <i class="i-mdi:add size-6" />
      <span>Faire une suggestion</span>
    </AppButton>
  </div>

  <teleport to="body">
    <AuthModal :show="authPopup" @close="authPopup = false" />
  </teleport>
</template>
