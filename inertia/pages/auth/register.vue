<script lang="ts" setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import AppButton from '~/components/utils/AppButton.vue'
import Empty from '~/layouts/empty.vue'

defineOptions({
  layout: Empty,
})

const form = useForm({
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})
</script>

<template>
  <Head title="Crée mon compte" />

  <div class="min-h-screen w-full flex justify-center items-center p-4">
    <div
      class="w-full max-w-md backdrop-blur-md bg-primary-800/50 rounded-2xl border border-white/10 shadow-xl overflow-hidden"
    >
      <div class="p-8">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-white">Crée un compte</h1>
          <p class="text-white/60 text-sm mt-2">
            Créez un compte pour accéder à toutes les fonctionnalités.
          </p>
        </div>

        <form class="space-y-6" @submit.prevent="form.post('/register')">
          <div class="space-y-4">
            <div class="space-y-1">
              <input
                v-model="form.userName"
                class="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                placeholder="Nom d'utilisateur"
                type="text"
              />
              <span v-if="form.errors.userName" class="color-red">
                Le nom d'utilisateur est invalide.
              </span>
            </div>

            <div class="space-y-1">
              <input
                v-model="form.email"
                class="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                placeholder="Adresse email"
                type="email"
              />
              <span v-if="form.errors.email" class="color-red">
                L'adresse e-mail est invalide.
              </span>
            </div>

            <div class="space-y-1">
              <input
                v-model="form.password"
                class="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                placeholder="Mot de passe"
                type="password"
              />
              <span v-if="form.errors.password" class="color-red">
                Le mot de passe est requis.
              </span>
            </div>

            <div class="space-y-1">
              <input
                v-model="form.passwordConfirmation"
                class="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                placeholder="Confirmer le mot de passe"
                type="password"
              />
              <span v-if="form.errors.passwordConfirmation" class="color-red">
                La confirmation du mot de passe est requise.
              </span>
            </div>
          </div>

          <div>
            <AppButton
              v-if="form.processing"
              class="w-full py-3"
              disabled
              icon="i-mdi:loading animate-spin"
              label="Création en cours..."
            />
            <AppButton
              v-else
              class="w-full py-3"
              icon="i-mdi:account-plus"
              label="Crée mon compte"
            />
          </div>

          <div class="relative flex items-center my-6">
            <div class="flex-grow border-t border-white/10"></div>
            <span class="flex-shrink mx-4 text-white/60 text-sm">OU CONTINUER AVEC</span>
            <div class="flex-grow border-t border-white/10"></div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <a
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all duration-300"
              href="/discord/redirect"
            >
              <i class="i-mdi:discord text-lg"></i>
              <span>Discord</span>
            </a>

            <a
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all duration-300"
              href="/google/redirect"
            >
              <i class="i-mdi:google text-lg"></i>
              <span>Google</span>
            </a>
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-white/60 text-sm">
            Vous avez déjà un compte ?
            <Link class="color-white hover:color-secondary transition-colors" href="/login">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
