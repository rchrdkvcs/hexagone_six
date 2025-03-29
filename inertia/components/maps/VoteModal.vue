<script lang="ts" setup>
import { InferPageProps } from '@adonisjs/inertia/types'
import MapsController from '#controllers/maps_controller'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import EmptyState from '~/components/maps/VoteModal/EmptyState.vue'
import SuggestionList from '~/components/maps/VoteModal/SuggestionList.vue'
import ActionButtons from '~/components/maps/VoteModal/ActionButtons.vue'
import SuggestionPopup from '~/components/maps/VoteModal/SuggestionPopup.vue'
import ModalHeader from '~/components/maps/VoteModal/ModalHeader.vue'

// Types and props
type Marker = InferPageProps<MapsController, 'show'>['map']['markers']
type Suggestion = (typeof props.marker.suggestions)[number]

const props = defineProps<{ marker: Marker; map: any }>()
const emit = defineEmits(['close'])

// State
const suggestions = ref([...props.marker.suggestions])
const showAllSuggestions = ref(false)
const isVisible = ref(false)
const panelsContainer = ref<HTMLElement | null>(null)
const topSuggestionsPanel = ref<HTMLElement | null>(null)
const allSuggestionsPanel = ref<HTMLElement | null>(null)
const showSuggestionPopup = ref(false)

// Computed data
const topSuggestions = computed(() =>
  [...suggestions.value].sort((a, b) => b.voteRatio - a.voteRatio).slice(0, 3)
)

const latestSuggestions = computed(() =>
  [...suggestions.value]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
)

const allSuggestions = computed(() =>
  [...suggestions.value].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
)

// Methods
const updateContainerHeight = async () => {
  await nextTick()
  if (!panelsContainer.value) return

  const activePanel = showAllSuggestions.value
    ? allSuggestionsPanel.value
    : topSuggestionsPanel.value

  if (activePanel) {
    panelsContainer.value.style.height = `${activePanel.offsetHeight}px`
  }
}

const handleSuggestionUpdate = (updatedSuggestion: Suggestion) => {
  const index = suggestions.value.findIndex((s) => s.id === updatedSuggestion.id)
  if (index !== -1) {
    suggestions.value = [
      ...suggestions.value.slice(0, index),
      updatedSuggestion,
      ...suggestions.value.slice(index + 1),
    ]
  }
}

const closeModal = () => {
  isVisible.value = false
  setTimeout(() => emit('close'), 300)
}

const addNewSuggestion = async (text: string) => {
  try {
    const suggestion = await axios.post('/markers/suggestions', {
      markerId: props.marker.id,
      label: text,
    })
    suggestions.value.push(suggestion.data)
  } catch (error) {
    console.error('Failed to add suggestion:', error)
  }
}

// Initialization
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      isVisible.value = true
      updateContainerHeight()
    }, 50)
  })
})

watch([showAllSuggestions, suggestions], updateContainerHeight, { deep: true })
</script>

<template>
  <aside
    :class="[
      'fixed top-1/2 -translate-y-1/2 w-350px bg-#24262A/75 backdrop-blur-lg p-4 rounded-2xl z-999 border border-white/15 shadow-lg flex flex-col gap-6 transition-all duration-300 ease-in-out',
      isVisible ? 'right-8 opacity-100' : 'right-[-400px] opacity-0',
    ]"
  >
    <ModalHeader
      :show-all-suggestions="showAllSuggestions"
      @back="showAllSuggestions = false"
      @close="closeModal"
    />

    <EmptyState v-if="suggestions.length === 0" />

    <div v-else ref="panelsContainer" class="panels-container">
      <Transition :name="showAllSuggestions ? 'suggest-panel-forward' : 'suggest-panel-backward'">
        <div
          v-if="showAllSuggestions"
          key="all-suggestions"
          ref="allSuggestionsPanel"
          class="w-full"
        >
          <SuggestionList
            :suggestions="allSuggestions"
            :total="suggestions.length"
            title="Suggestions"
            title-class="pl-8"
            @suggestion-updated="handleSuggestionUpdate"
          />
        </div>

        <div v-else key="top-suggestions" ref="topSuggestionsPanel" class="panel">
          <SuggestionList
            :suggestions="topSuggestions"
            class="border-b border-white/10 pb-6"
            title="Top 3"
            @suggestion-updated="handleSuggestionUpdate"
          />

          <SuggestionList
            :suggestions="latestSuggestions"
            class="border-b border-white/10 py-6"
            title="Dernières suggestions"
            @suggestion-updated="handleSuggestionUpdate"
          />
        </div>
      </Transition>
    </div>

    <ActionButtons
      :has-suggestions="suggestions.length > 0"
      :show-all-suggestions="showAllSuggestions"
      @view-all="showAllSuggestions = true"
      @add-suggestion="showSuggestionPopup = true"
    />
  </aside>

  <SuggestionPopup
    v-if="showSuggestionPopup"
    @close="showSuggestionPopup = false"
    @add-suggestion="addNewSuggestion"
  />
</template>

<style scoped>
.suggestion-list-move,
.suggestion-list-enter-active,
.suggestion-list-leave-active {
  transition: all 0.5s ease;
}

.suggestion-list-enter-from,
.suggestion-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.suggestion-list-leave-active {
  position: absolute;
}

.suggest-panel-forward-enter-active,
.suggest-panel-forward-leave-active,
.suggest-panel-backward-enter-active,
.suggest-panel-backward-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.suggest-panel-forward-enter-from {
  transform: translateX(100%);
}

.suggest-panel-forward-leave-to {
  transform: translateX(-100%);
}

.suggest-panel-backward-enter-from {
  transform: translateX(-100%);
}

.suggest-panel-backward-leave-to {
  transform: translateX(100%);
}

.panels-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: height 0.4s ease;
}
</style>
