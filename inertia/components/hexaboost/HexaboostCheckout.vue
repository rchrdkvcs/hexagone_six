<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

const form = useForm({
  email: '',
})

const isLoading = ref(false)
const error = ref('')

async function checkout() {
  if (!form.email) {
    error.value = 'Veuillez entrer votre email'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const { loadStripe } = await import('@stripe/stripe-js')

    const response = await fetch('/payments/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
      }),
    })

    const data = await response.json()

    if (data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } else {
      // Initialize Stripe Elements for custom checkout
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })
      } else {
        console.log('Stripe not initialized')
      }
    }
  } catch (err) {
    console.error('Payment error:', err)
    error.value = 'Une erreur est survenue lors du traitement du paiement'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="relative bg-default border-t border-default" id="checkout">
    <span
      class="absolute size-full inset-0 isolate bg-gradient-to-b from-muted dark:from-muted/40 to-default"
    />

    <UContainer class="w-full space-y-8 md:space-y-16 flex flex-col py-16 lg:py-24">
      <div class="space-y-2 px-4 md:px-0 z-0">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center"
        >
          Fais de ton PC un outil de performance. <br />
          Pas une source de frustration.
        </h2>

        <p class="text-base sm:text-lg text-muted text-center text-balance mt-6">
          HexaBoost, c'est ton setup. Nettoyé. Accéléré. Optimisé.
        </p>
      </div>

      <UCard class="z-0 max-w-md mx-auto">
        <div class="flex flex-col items-center gap-4">
          <UBadge label="Offre de lancement" variant="soft" size="lg" class="rounded-full" />

          <div class="flex items-end justify-center">
            <span class="text-muted line-through text-lg">100 €</span>
            <span class="text-3xl ms-2 font-bold text-highlighted">90 €</span>
          </div>

          <ul class="w-full space-y-2">
            <li class="flex items-center">
              <UIcon name="lucide:check" class="text-primary me-2 size-5" />
              <span>Optimisation HexaBoost complète</span>
            </li>
            <li class="flex items-center">
              <UIcon name="lucide:check" class="text-primary me-2 size-5" />
              <span>Support technique à vie</span>
            </li>
            <li class="flex items-center">
              <UIcon name="lucide:check" class="text-primary me-2 size-5" />
              <span>Mises à jour HexaBoost incluses</span>
            </li>
          </ul>

          <!-- Add email input for payment -->
          <div class="w-full mt-4">
            <UFormField :error="form.errors.email" label="Email" required>
              <UInput
                v-model="form.email"
                class="w-full"
                color="neutral"
                placeholder="Adresse e-mail"
                type="text"
              />
            </UFormField>

            <p v-if="error" class="text-sm text-red-500 mt-2">{{ error }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex flex-col items-center gap-3">
            <UButton
              class="w-full"
              color="primary"
              size="xl"
              icon="lucide:shopping-cart"
              :loading="isLoading"
              :disabled="isLoading"
              @click="checkout"
            >
              Commander mon HexaBoost
            </UButton>
            <p class="text-xs text-muted text-center">
              Paiement sécurisé par Stripe · Satisfaction garantie
            </p>
          </div>
        </template>
      </UCard>
    </UContainer>
  </section>
</template>

<style scoped></style>
