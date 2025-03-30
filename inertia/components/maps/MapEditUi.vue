<script lang="ts" setup>
import PenIcon from '~/components/Icones/PenIcon.vue'
import CloseIcon from '~/components/Icones/CloseIcon.vue'
import { Link, usePage } from '@inertiajs/vue3'
import { SharedProps } from '@adonisjs/inertia/types'

defineProps<{
  isEditMode: boolean
  isLoading: boolean
  saveSuccess: boolean
  saveError: string | null
}>()
const page = usePage()
const user = page.props.user as SharedProps['user']

const emit = defineEmits(['toggle-edit-mode'])

const toggleEditMode = () => emit('toggle-edit-mode')
</script>

<template>
  <div v-if="!user">
    <div class="fixed top-4 right-4 z-999 flex gap-2">
      <Link
        class="py-2 px-3 bg-#24262A/50 backdrop-blur-lg border border-white/15 rounded-xl flex items-center gap-2 hover:bg-white transition-colors duration-300 ease-in-out color-white/80 hover:color-black"
        href="/login"
      >
        Se connecter
      </Link>
    </div>
  </div>

  <div v-else-if="user.role.access > 1">
    <div class="fixed top-4 right-4 z-999 flex gap-2">
      <button
        v-if="isEditMode"
        class="py-2 px-3 bg-#24262A/50 backdrop-blur-lg border border-white/15 rounded-xl flex items-center gap-2 hover:bg-red-600 transition-colors duration-300 ease-in-out color-white/80 hover:color-white"
        @click="toggleEditMode"
      >
        <CloseIcon class="w-6 h-6" />
        <span>Quitter le mode editeur</span>
      </button>

      <button
        v-else
        class="py-2 px-3 bg-#24262A/50 backdrop-blur-lg border border-white/15 rounded-xl flex items-center gap-2 hover:bg-white transition-colors duration-300 ease-in-out color-white/80 hover:color-black"
        @click="toggleEditMode"
      >
        <PenIcon class="w-6 h-6" />
        <span>Mode editeur</span>
      </button>
    </div>
  </div>
</template>
