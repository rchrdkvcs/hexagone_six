<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

interface FAQItem {
  question: string
  answer: string
}

interface ServiceItem {
  title: string
  description: string
  icon: string
  link: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Comment puis-je participer à la LAN Hexagone 6 ?',
    answer:
      "Les inscriptions se font via notre site web. Surveillez nos annonces sur Discord pour connaître les dates d'ouverture des inscriptions.",
  },
  {
    question: 'HexaBoost est-il compatible avec mon PC ?',
    answer:
      'HexaBoost est compatible avec la plupart des configurations PC modernes. Nos techniciens évaluent chaque machine individuellement pour garantir la compatibilité.',
  },
  {
    question: 'Comment fonctionne HexaCall ?',
    answer:
      'HexaCall est un outil participatif où vous pouvez proposer des noms pour les spots des cartes, voter pour les meilleurs calls, et apprendre la nomenclature utilisée par la communauté.',
  },
  {
    question: 'Les PC Clutch sont-ils livrés montés ?',
    answer:
      'Oui, tous nos PC Clutch sont livrés entièrement montés, testés et optimisés pour Rainbow Six Siege.',
  },
  {
    question: 'Puis-je annuler ma commande HexaBoost ?',
    answer:
      "Vous pouvez annuler votre commande HexaBoost avant le début de l'intervention. Contactez-nous sur Discord pour plus d'informations.",
  },
]

const services: ServiceItem[] = [
  {
    title: 'LAN Hexagone 6',
    description: 'Événement compétitif parisien',
    icon: 'lucide:gamepad-2',
    link: '/lan',
  },
  {
    title: 'HexaCall',
    description: 'Outil de naming de maps',
    icon: 'lucide:map',
    link: '/hexacall',
  },
  {
    title: 'HexaBoost',
    description: 'Optimisation PC sur-mesure',
    icon: 'lucide:settings',
    link: '/hexaboost',
  },
  {
    title: 'PC Clutch',
    description: 'PC optimisés pour Siege X',
    icon: 'lucide:computer',
    link: '/pc-clutch',
  },
]
</script>

<template>
  <!-- Hero Section -->
  <section
    class="size-full min-h-[calc(100vh-64px)] relative flex flex-col items-center justify-center"
  >
    <UContainer class="py-16 lg:py-24">
      <div class="text-center space-y-6">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium"
        >
          <UIcon name="lucide:help-circle" class="w-4 h-4" />
          Centre d'aide
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-highlighted tracking-tight">
          Comment pouvons-nous vous aider ?
        </h1>

        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Trouvez des réponses à vos questions ou contactez notre équipe sur Discord pour un support
          personnalisé.
        </p>
      </div>
    </UContainer>

    <UContainer
      class="lg:absolute flex flex-col lg:flex-row gap-4 bottom-16 mb-8 items-center justify-center"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <div v-for="service in services" :key="service.title" class="group">
          <Link :href="service.link">
            <div
              class="bg-default border border-default rounded-xl p-6 h-full transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-lg"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <UIcon :name="service.icon" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3
                    class="font-semibold text-highlighted group-hover:text-primary transition-colors"
                  >
                    {{ service.title }}
                  </h3>
                </div>
              </div>
              <p class="text-muted-foreground text-sm">
                {{ service.description }}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- FAQ Section -->
  <section class="py-16 lg:py-20 bg-default border-t border-default">
    <UContainer>
      <div class="max-w-4xl mx-auto space-y-12">
        <div class="text-center space-y-4">
          <h2 class="text-3xl lg:text-4xl font-bold text-highlighted">Questions Fréquentes</h2>
          <p class="text-lg text-muted-foreground">
            Trouvez rapidement les réponses aux questions les plus courantes.
          </p>
        </div>

        <div class="space-y-4">
          <UAccordion
            :items="
              faqItems.map((item, index) => ({
                label: item.question,
                content: item.answer,
                defaultOpen: index === 0,
              }))
            "
          />
        </div>
      </div>
    </UContainer>
  </section>

  <!-- Support Discord Section -->
  <section class="py-16 lg:py-20 bg-default border-t border-default">
    <UContainer>
      <div class="bg-muted rounded-2xl p-8 lg:p-12 text-center">
        <div class="space-y-6">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-accented rounded-full">
            <UIcon name="lucide:message-circle" class="w-8 h-8 text-default" />
          </div>

          <div class="space-y-4">
            <h2 class="text-3xl lg:text-4xl font-bold text-highlighted">
              Besoin d'aide personnalisée ?
            </h2>

            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rejoignez notre Discord et ouvrez un ticket pour obtenir une assistance rapide et
              personnalisée de notre équipe.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <UButton
              size="xl"
              color="primary"
              variant="solid"
              external
              to="https://discord.gg/ABFsPxuYZr"
              class="px-8"
            >
              <UIcon name="lucide:external-link" class="w-5 h-5 mr-2" />
              Rejoindre le Discord
            </UButton>

            <div class="text-sm text-muted-foreground flex items-center gap-2">
              <UIcon name="lucide:clock" class="w-4 h-4" />
              Réponse sous 2h en moyenne
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- Contact Methods -->
  <section class="py-16 lg:py-20 bg-default border-t border-default">
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-highlighted">Autres moyens de contact</h2>
          <p class="text-lg text-muted-foreground">
            Plusieurs façons de nous joindre selon vos préférences.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Discord -->
          <div class="text-center space-y-4 p-6 bg-default rounded-xl border border-default">
            <div
              class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto"
            >
              <UIcon
                name="lucide:message-circle"
                class="w-6 h-6 text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <h3 class="font-semibold text-highlighted">Discord</h3>
            <p class="text-sm text-muted-foreground">Support en temps réel</p>
            <UButton
              variant="subtle"
              color="neutral"
              external
              to="https://discord.gg/ABFsPxuYZr"
              block
              label="Rejoindre le Discord"
            />
          </div>

          <!--          &lt;!&ndash; Email &ndash;&gt;-->
          <!--          <div class="text-center space-y-4 p-6 bg-default rounded-xl border border-default">-->
          <!--            <div-->
          <!--              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto"-->
          <!--            >-->
          <!--              <UIcon name="lucide:mail" class="w-6 h-6 text-green-600 dark:text-green-400" />-->
          <!--            </div>-->
          <!--            <h3 class="font-semibold text-highlighted">Email</h3>-->
          <!--            <p class="text-sm text-muted-foreground">Pour les demandes plus formelles</p>-->
          <!--            <UButton-->
          <!--              variant="subtle"-->
          <!--              color="neutral"-->
          <!--              external-->
          <!--              to="mailto:contact@hexagone6.fr"-->
          <!--              block-->
          <!--              label="Nous contacter par email"-->
          <!--            />-->
          <!--          </div>-->

          <!-- Twitter -->
          <div class="text-center space-y-4 p-6 bg-default rounded-xl border border-default">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto"
            >
              <UIcon name="lucide:twitter" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="font-semibold text-highlighted">Twitter</h3>
            <p class="text-sm text-muted-foreground">Suivez nos actualités et annonces</p>
            <UButton
              variant="subtle"
              color="neutral"
              external
              to="https://x.com/hexagonesix"
              block
              label="Suivre sur Twitter"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
