<script lang="ts" setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import Empty from '~/layouts/empty.vue'

defineOptions({
  layout: Empty,
})

const form = useForm({
  email: '',
  password: '',
} as {
  email: string
  password: string
  code?: string
})

const showPassword = ref(false)
</script>

<template>
  <Head title="Se connecter" />

  <div class="min-h-screen w-full flex justify-center items-center p-4">
    <UCard
      :ui="{
        header: 'space-y-2',
        footer: 'flex items-center justify-center gap-2',
      }"
      class="w-md backdrop-blur-md"
      variant="subtle"
    >
      <template #header>
        <h1 class="text-2xl font-bold">Connectez-vous à R6Calls</h1>
        <p class="text-muted text-sm">Accédez à votre compte pour commencer l'aventure !</p>
      </template>

      <form class="space-y-6" @submit.prevent="form.post('/login')">
        <div class="space-y-4">
          <UFormField :error="form.errors.email" label="Email" required>
            <UInput
              v-model="form.email"
              class="w-full"
              color="neutral"
              placeholder="Adresse e-mail"
              size="xl"
              type="text"
            />
          </UFormField>

          <UFormField :error="form.errors.password" label="Mot de passe" required>
            <UInput
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
              color="neutral"
              placeholder="Password"
              size="xl"
            >
              <template #trailing>
                <UButton
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :aria-pressed="showPassword"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  aria-controls="password"
                  color="neutral"
                  variant="link"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>
        </div>

        <UButton
          :label="form.processing ? 'Connection...' : 'Poursuivre avec mon e-mail'"
          :loading="form.processing"
          class="w-full justify-center cursor-pointer"
          icon="lucide:at-sign"
          size="xl"
          type="submit"
        />

        <div v-if="form.errors.code" class="w-full flex flex-col justify-center items-center">
          <span v-if="form.errors.code === 'E_INVALID_CREDENTIALS'" class="color-red">
            Aucun n'a été trouvé avec ces identifiants.
          </span>
        </div>

        <USeparator label="Ou continuer avec" />

        <div class="grid grid-cols-2 gap-4">
          <UButton
            class="w-full justify-center cursor-pointer"
            color="neutral"
            external
            icon="ic:baseline-discord"
            label="Discord"
            size="xl"
            target="_self"
            to="/discord/redirect"
            variant="subtle"
          />

          <UButton
            class="w-full justify-center cursor-pointer"
            color="neutral"
            external
            icon="mdi:google"
            label="Google"
            size="xl"
            target="_self"
            to="/google/redirect"
            variant="subtle"
          />
        </div>
      </form>

      <template #footer>
        <p class="text-toned">Vous n'avez pas de compte ?</p>
        <ULink class="text-secondary" to="/register">Crée un compte</ULink>
      </template>
    </UCard>
  </div>
</template>
