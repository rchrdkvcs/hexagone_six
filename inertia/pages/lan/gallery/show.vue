<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  imagesUrl: string[]
}>()

const selectedIndex = ref(0)

const goToImage = (index: number) => {
  selectedIndex.value = index
}

const onThumbnailClick = (index: number) => {
  goToImage(index)
}

const next = () => {
  const newIndex = (selectedIndex.value + 1) % props.imagesUrl.length
  goToImage(newIndex)
}

const prev = () => {
  const newIndex = (selectedIndex.value - 1 + props.imagesUrl.length) % props.imagesUrl.length
  goToImage(newIndex)
}
</script>

<template>
  <UContainer class="space-y-16 py-8 lg:py-16 xl:py-24">
    <div class="aspect-video bg-default ring ring-default rounded-lg overflow-hidden relative">
      <div class="h-full w-full flex items-center justify-center">
        <img
          :src="imagesUrl[selectedIndex]"
          :alt="`Image ${selectedIndex + 1}`"
          class="object-contain max-h-full max-w-full"
          loading="eager"
        />
      </div>

      <UButton
        icon="lucide:arrow-left"
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2"
        variant="subtle"
        color="neutral"
        size="lg"
      />

      <UButton
        icon="lucide:arrow-right"
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2"
        variant="subtle"
        color="neutral"
        size="lg"
      />

      <UBadge class="absolute bottom-2 right-2 rounded-full" color="neutral" variant="soft">
        {{ selectedIndex + 1 }} / {{ imagesUrl.length }}
      </UBadge>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <div
        v-for="(image, index) in imagesUrl"
        :key="index"
        class="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
        :class="{ 'ring-2 ring-primary': selectedIndex === index }"
        @click="onThumbnailClick(index)"
      >
        <img
          :src="image"
          :alt="`Thumbnail ${index + 1}`"
          class="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  </UContainer>
</template>
