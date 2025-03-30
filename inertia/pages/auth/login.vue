<script lang="ts" setup>
import { Head, useForm } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({
  layout: AuthLayout,
})

const form = useForm({
  userName: '',
  password: '',
})

const submit = (e: Event) => {
  e.preventDefault()
  form.post('/login', {
    onFinish: () => form.reset(),
    onError: (errors) => {
      console.error(errors)
    },
  })
}
</script>

<template>
  <Head title="Login" />

  <div class="w-full h-full flex justify-center items-center">
    <form
      class="w-450px h-fit p-6 bg-#24262A/50 rounded-2xl border border-white/15 backdrop-blur-lg flex flex-col items-center gap-4"
    >
      <h1 class="text-4xl font-bold text-center text-white">Connexion</h1>
      <div class="flex flex-col justify-center items-center gap-2 w-full">
        <input
          v-model="form.userName"
          class="p-2 rounded-xl bg-#24262A/50 border border-white/15 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out w-full"
          placeholder="Username"
          type="text"
        />
        <input
          v-model="form.password"
          class="p-2 rounded-xl bg-#24262A/50 border border-white/15 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out w-full"
          placeholder="Mot de passe"
          type="password"
        />
      </div>
      <button
        class="py-2 px-3 bg-white/15 border border-white/15 rounded-xl flex items-center gap-2 justify-center w-full color-white hover:(bg-white color-black) transition-colors duration-300"
        @click.prevent="submit"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>
