<script setup lang="ts"></script>

<template>
  <section class="bg-default">
    <UContainer class="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-4">
      <UIcon name="lucide:check-circle" class="text-primary size-16" />
      <h1 class="text-3xl font-bold">Paiement réussi !</h1>
      <p class="text-lg text-muted max-w-lg text-center">Merci pour votre achat de HexaBoost.</p>

      <div class="bg-muted p-4 rounded-lg ring ring-default my-4 max-w-lg">
        <h2 class="font-semibold text-lg mb-2">Prochaines étapes :</h2>
        <ol class="list-decimal pl-5 space-y-2">
          <li>
            Rejoignez notre
            <ULink to="https://discord.gg/ABFsPxuYZr" class="underline">Discord</ULink>
          </li>
          <li>
            Ouvrez un ticket en soumettant vos informations :
            <ul class="list-disc pl-5 mt-1">
              <li>Nom</li>
              <li>Prénom</li>
              <li>Email (identique à celui utilisé lors de votre achat)</li>
            </ul>
          </li>
          <li>
            Attendez que notre équipe revienne vers vous pour commencer votre optimisation
            HexaBoost.
          </li>
        </ol>
      </div>

      <div class="flex flex-col gap-4 w-full max-w-lg">
        <UButton
          icon="simple-icons:discord"
          label="Rejoindre le discord"
          to="https://discord.gg/ABFsPxuYZr"
          size="xl"
          block
        />
        <UButton
          to="/"
          label="Retourner a l'accueil"
          icon="lucide:home"
          variant="ghost"
          color="neutral"
          block
        />
      </div>
    </UContainer>
  </section>
</template>
