<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppButton from '~/components/utils/AppButton.vue'
import { useForm } from '@inertiajs/vue3'

defineProps<{
  show: boolean
}>()

const form = useForm({
  email: '',
  password: '',
})

const currentUrl = ref(window.location.href)

const submit = (e: Event) => {
  e.preventDefault()
  form.post('/login', {
    onFinish: () => form.reset(),
    onError: (errors) => {
      console.error(errors)
    },
  })
}

const emit = defineEmits(['close'])

// Handle escape key to close popup
const handleKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
  currentUrl.value = window.location.href
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center z-999 bg-black/25 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-primary-800/50 backdrop-blur-lg rounded-2xl w-11/12 max-w-md border border-white/15 shadow-lg color-white p-6"
    >
      <div class="text-center mb-6">
        <i class="i-mdi:account-lock text-4xl mb-3"></i>
        <h2 class="text-xl font-bold text-white">Authentification requise</h2>
        <p class="text-white/60 text-sm mt-2">
          Connectez-vous ou inscrivez-vous pour proposer une suggestion.
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <input
              v-model="form.email"
              class="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="Adresse email"
              type="email"
            />
          </div>

          <div>
            <input
              v-model="form.password"
              class="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="Mot de passe"
              type="password"
            />
          </div>
        </div>

        <div>
          <AppButton class="w-full py-3" icon="i-mdi:email" label="Poursuivre avec mon e-mail" />
        </div>

        <div class="relative flex items-center my-6">
          <div class="flex-grow border-t border-white/10"></div>
          <span class="flex-shrink mx-4 text-white/60 text-sm">OU CONTINUER AVEC</span>
          <div class="flex-grow border-t border-white/10"></div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <a
            :href="`/discord/redirect?returnUrl=${encodeURIComponent(currentUrl)}`"
            class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all duration-300"
          >
            <i class="i-mdi:discord text-lg"></i>
            <span>Discord</span>
          </a>

          <a
            :href="`/google/redirect?returnUrl=${encodeURIComponent(currentUrl)}`"
            class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all duration-300"
          >
            <i class="i-mdi:google text-lg"></i>
            <span>Google</span>
          </a>
        </div>
      </form>

      <div class="mt-6 text-center">
        <p class="text-white/60 text-sm">
          Vous n'avez pas de compte ?
          <a
            :href="`/register?returnUrl=${encodeURIComponent(currentUrl)}`"
            class="color-white hover:color-secondary transition-colors"
            >S'inscrire</a
          >
        </p>
      </div>

      <div class="mt-6 text-center">
        <button
          class="text-white/60 text-sm hover:text-white transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
