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
            <div class="mb-4 p-3 bg-amber-100 rounded-full">
              <UIcon name="lucide:lock" class="w-8 h-8 text-amber-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900">
              🔓 Débloquez ce guide complet
            </h3>
            <p class="text-sm text-gray-500 mt-2">
              Par <span class="font-medium">{{ guide.author }}</span>
            </p>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Description -->
          <p class="text-gray-600 text-center leading-relaxed">
            Ce guide contient encore beaucoup de contenu exclusif avec des stratégies avancées, 
            des astuces pro et des analyses détaillées.
          </p>

          <!-- Features avec badges -->
          <div class="space-y-3">
            <UBadge color="green" variant="soft" class="w-full justify-start">
              <UIcon name="lucide:check" class="w-4 h-4 mr-2" />
              Accès à vie au guide complet
            </UBadge>
            <UBadge color="blue" variant="soft" class="w-full justify-start">
              <UIcon name="lucide:star" class="w-4 h-4 mr-2" />
              Contenu exclusif et détaillé
            </UBadge>
            <UBadge color="purple" variant="soft" class="w-full justify-start">
              <UIcon name="lucide:trophy" class="w-4 h-4 mr-2" />
              Stratégies éprouvées par des pros
            </UBadge>
          </div>

          <!-- Alert d'erreur -->
          <UAlert
            v-if="error"
            color="red"
            variant="soft"
            :title="error"
            icon="lucide:alert-circle"
          />

          <!-- Prix en évidence -->
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-gray-900">
              {{ access.priceFormatted }}€
            </div>
            <div class="text-sm text-gray-500">
              Paiement unique
            </div>
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

            <UButton
              v-else
              size="lg"
              color="primary"
              variant="solid"
              block
              to="/connexion"
            >
              <UIcon name="lucide:user" class="w-4 h-4 mr-2" />
              Se connecter pour acheter
            </UButton>

            <!-- Bouton secondaire -->
            <UButton
              size="sm"
              color="gray"
              variant="ghost"
              block
              to="/guides"
            >
              <UIcon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
              Retour aux guides
            </UButton>

            <!-- Trust indicators -->
            <div class="flex justify-center gap-6 pt-3 text-xs text-gray-500">
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
