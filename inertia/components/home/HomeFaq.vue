<script lang="ts" setup>
const faqs = [
  {
    label: 'Comment contribuer aux callouts ?',
    content:
      "Connectez-vous à votre compte, puis rendez-vous sur la page d'une carte. Cliquez sur la zone pour laquelle vous souhaitez proposer un callout et soumettez votre suggestion. La communauté pourra ensuite voter pour les callouts les plus pertinents.",
  },
  {
    label: 'Comment sont validés les callouts ?',
    content:
      "Les callouts sont validés par un système de vote communautaire. Les utilisateurs peuvent voter pour ou contre chaque suggestion. Les callouts ayant le meilleur score sont mis en avant dans l'interface principale.",
  },
  {
    label: 'Est-ce que je peux utiliser la plateforme sur mobile ?',
    content:
      'Absolument ! Notre site est entièrement responsive et optimisé pour une utilisation sur mobile, tablette et desktop. Vous pouvez facilement consulter les callouts entre deux parties, même sur smartphone.',
  },
  {
    label: 'Comment signaler un callout inapproprié ?',
    content:
      "Cliquez sur les trois points à côté du callout concerné, puis sélectionnez 'Signaler'. Notre équipe de modération examinera votre signalement dans les plus brefs délais.",
  },
  {
    label: 'Les cartes sont-elles mises à jour avec les nouvelles saisons ?',
    content:
      "Oui, nous mettons à jour notre base de données dès qu'une nouvelle saison introduit des changements de maps. Notre équipe s'efforce de maintenir les informations à jour pour refléter l'état actuel du jeu.",
  },
  {
    label: 'Comment devenir modérateur ?',
    content:
      "Les utilisateurs actifs et respectueux qui contribuent régulièrement à la plateforme peuvent être invités à rejoindre l'équipe de modération. Si vous êtes intéressé, contactez-nous via la page de contact en précisant votre motivation.",
  },
]
</script>

<template>
  <UContainer class="w-full space-y-6 md:space-y-8 px-4 md:px-0">
    <div class="space-y-2">
      <h2 class="text-2xl md:text-3xl font-bold">Des questions ?</h2>
      <p class="text-base md:text-lg text-muted">
        Consultez notre FAQ pour trouver des réponses aux questions les plus fréquentes sur
        l'utilisation de la plateforme et la contribution à la communauté.
      </p>
    </div>

    <div class="bg-elevated/50 backdrop-blur-xl rounded-lg p-4 md:p-8 ring ring-default">
      <UAccordion
        :items="faqs"
        :ui="{
          trigger:
            'text-base md:text-lg cursor-pointer hover:text-primary transition-colors duration-300',
        }"
      />
    </div>
  </UContainer>
</template>
