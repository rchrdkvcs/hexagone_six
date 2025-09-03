<script lang="ts" setup>
defineProps<{
  name: string
  description: string
  price: string
  imageUrl: string
  config: {
    cpu: string
    mb: string
    gpu: string
    ram: string
    storage: string
    cooling: string
    pu: string
    case: string
  }
  performance: string[]
  link: string
  subDescription?: string
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-highlighted">
            {{ name }}
          </h2>
          <p class="text-sm text-muted">
            {{ description }}
          </p>
        </div>
        <UBadge :label="price" color="success" variant="soft" size="xl" />
      </div>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <img :src="imageUrl" :alt="`Image de ${name}`" class="rounded-lg" loading="eager" />

      <div class="space-y-2">
        <ul class="space-y-1">
          <li>
            <b>CPU:</b> <br />
            - {{ config.cpu }}
          </li>
          <li>
            <b>Carte Mere:</b> <br />
            - {{ config.mb }}
          </li>
          <li>
            <b>GPU:</b> <br />
            - {{ config.gpu }}
          </li>
          <li>
            <b>RAM:</b> <br />
            - {{ config.ram }}
          </li>
          <li>
            <b>Stockage:</b> <br />
            - {{ config.storage }}
          </li>
          <li>
            <b>Refroidissement:</b> <br />
            - {{ config.cooling }}
          </li>
        </ul>

        <div class="text-muted">
          <p>{{ subDescription }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <UPopover arrow>
          <UButton color="neutral" variant="ghost" label="Performances" icon="lucide:bar-chart-2" />

          <template #content>
            <div class="flex flex-col gap-1 p-3">
              <p v-for="perf in performance">
                {{ perf }}
              </p>
            </div>
          </template>
        </UPopover>

        <UButton :to="link" color="primary" label="Voir le produit" icon="lucide:external-link" />
      </div>
    </template>
  </UCard>
</template>
