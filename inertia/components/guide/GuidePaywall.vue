<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface Props {
  guide: {
    id: string
    title: string
    price: number
    author: string
  }
  access: {
    hasAccess: boolean
    isFree: boolean
    isPaid: boolean
    truncated: boolean
    price: number
    priceFormatted: string
  }
  user?: {
    id: string
    email: string
  } | null
}

const props = defineProps<Props>()

const isLoading = ref(false)
const error = ref<string | null>(null)

/**
 * Gérer l'achat du guide
 */
async function handlePurchase() {
  if (!props.user) {
    // Rediriger vers la connexion
    router.visit('/connexion')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    // Appeler l'API de paiement pour créer une session Stripe
    const response = await fetch(`/guide/${props.guide.id}/payments/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la session de paiement')
    }

    const data = await response.json()

    if (data.url) {
      // Rediriger vers Stripe Checkout
      window.location.href = data.url
    } else {
      throw new Error('URL de paiement invalide')
    }
  } catch (err) {
    console.error("Erreur lors de l'achat:", err)
    error.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Paywall overlay sans effet de blur (géré par le parent) -->
  <div v-if="access.truncated" class="relative">
    <!-- Contenu du paywall -->
    <div class="relative z-30 mt-8 flex justify-center">
      <UCard class="max-w-lg w-full shadow-xl">
        <template #header>
          <div class="flex flex-col items-center text-center">
            <div class="mb-4 p-3 bg-warning/25 rounded-full">
              <UIcon name="lucide:lock" class="w-8 h-8 text-warning" />
            </div>
            <h3 class="text-xl font-bold">Débloquez ce guide complet</h3>
            <p class="text-sm text-muted mt-2">
              Par <span class="font-medium">{{ guide.author }}</span>
            </p>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Description -->
          <p class="text-center leading-relaxed">
            Ce guide contient encore beaucoup de contenu exclusif avec des stratégies avancées, des
            astuces pro et des analyses détaillées.
          </p>

          <!-- Features avec badges -->
          <div class="flex flex-col justify-start gap-2">
            <UBadge
              icon="lucide:check"
              label="Accès à vie au guide complet"
              color="neutral"
              variant="soft"
              class="w-fit bg-transparent"
            />
            <UBadge
              icon="lucide:star"
              label="Contenu exclusif et détaillé"
              color="neutral"
              variant="soft"
              class="w-fit bg-transparent"
            />
            <UBadge
              icon="lucide:trophy"
              label="Stratégies éprouvées par des pros"
              color="neutral"
              variant="soft"
              class="w-fit bg-transparent"
            />
          </div>

          <!-- Alert d'erreur -->
          <UAlert
            v-if="error"
            color="error"
            variant="soft"
            :title="error"
            icon="lucide:alert-circle"
          />

          <!-- Prix en évidence -->
          <div class="text-center p-4 bg-muted rounded-lg">
            <div class="text-3xl font-bold text-elevated">{{ access.priceFormatted }}€</div>
            <div class="text-sm text-muted">Paiement unique</div>
          </div>
        </div>

        <template #footer>
          <div class="space-y-3">
            <!-- Bouton principal d'achat -->
            <UButton
              v-if="user"
              :loading="isLoading"
              size="lg"
              color="primary"
              variant="solid"
              block
              @click="handlePurchase"
            >
              <UIcon name="lucide:credit-card" class="w-4 h-4 mr-2" />
              Acheter pour {{ access.priceFormatted }}€
            </UButton>

            <UButton v-else size="lg" color="primary" variant="solid" block to="/login">
              <UIcon name="lucide:user" class="w-4 h-4 mr-2" />
              Se connecter pour acheter
            </UButton>

            <!-- Bouton secondaire -->
            <UButton
              icon="lucide:arrow-left"
              label="Retour aux guides"
              color="neutral"
              size="sm"
              variant="ghost"
              block
              to="/guides"
            />

            <!-- Trust indicators -->
            <div class="flex justify-center gap-6 pt-3 text-xs text-muted">
              <div class="flex items-center gap-1">
                <UIcon name="lucide:shield-check" class="w-3 h-3 text-green-500" />
                <span>Paiement sécurisé</span>
              </div>
              <div class="flex items-center gap-1">
                <UIcon name="lucide:zap" class="w-3 h-3 text-blue-500" />
                <span>Accès immédiat</span>
              </div>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<!-- Pas de styles custom - utilise Tailwind CSS et Nuxt UI -->
