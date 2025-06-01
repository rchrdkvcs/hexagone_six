<script lang="ts" setup>
import { Head, useForm } from '@inertiajs/vue3'
import Empty from '~/layouts/empty.vue'
import { ref } from 'vue'

defineOptions({
  layout: Empty,
})

const form = useForm({
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const showPassword = ref(false)
</script>

<template>
  <Head title="Crée mon compte" />

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

      <form class="space-y-6" @submit.prevent="form.post('/register')">
        <div class="space-y-4">
          <UFormField :error="form.errors.userName" label="Nom d'utilisateur" required>
            <UInput
              v-model="form.userName"
              class="w-full"
              color="neutral"
              placeholder="Nom d'utilisateur"
              size="xl"
              type="text"
            />
          </UFormField>

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

          <UFormField
            :error="form.errors.passwordConfirmation"
            label="Confirmation du mot de passe"
            required
          >
            <UInput
              v-model="form.passwordConfirmation"
              :type="showPassword ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
              color="neutral"
              placeholder="Confirmation du mot de passe"
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
          :label="form.processing ? 'Creation du compte...' : 'Crée mon compte'"
          :loading="form.processing"
          class="w-full justify-center cursor-pointer"
          icon="lucide:user-plus"
          size="xl"
          type="submit"
        />

        <USeparator label="Ou continuer avec" />

        <div class="grid grid-cols-3 gap-2">
          <UButton
            class="w-full justify-center"
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
            class="w-full justify-center"
            color="neutral"
            external
            icon="mdi:twitch"
            label="Twitch"
            size="xl"
            target="_self"
            to="/twitch/redirect"
            variant="subtle"
          />

          <UButton
            class="w-full justify-center"
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
        <p class="text-toned">Déjà un compte ?</p>
        <ULink class="text-secondary" to="/login">Se connecter</ULink>
      </template>
    </UCard>
  </div>
</template>
