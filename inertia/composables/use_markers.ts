import { computed, ref } from 'vue'
import axios from 'axios'

export interface Marker {
  id: number | string
  label: string
  x: number
  y: number
  stage: number
  mapId?: string
}

interface MarkerResponse {
  success: boolean
  marker: Marker
  id?: string | number
  error?: string
}

export function use_markers(
  initialMarkers: Marker[],
  mapId: string,
  getCurrentStage: () => number,
  autoSave = false
) {
  const markers = ref<Marker[]>([...initialMarkers])
  const pendingChanges = ref<{
    type: 'add' | 'update' | 'delete'
    marker: Marker
  } | null>(null)

  const isLoading = ref(false)
  const saveSuccess = ref(false)
  const saveError = ref<string | null>(null)

  let nextTempId = -1
  let saveTimeout: NodeJS.Timeout | null = null

  // Get only markers for the current stage
  const stageMarkers = computed(() => {
    const currentStage = getCurrentStage()
    return markers.value.filter((m) => m.stage === currentStage)
  })

  // Save changes to the server using REST principles
  const saveMarkerChange = (change: { type: 'add' | 'update' | 'delete'; marker: Marker }) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    pendingChanges.value = change

    // Add a small delay to prevent too many requests
    saveTimeout = setTimeout(() => {
      isLoading.value = true
      saveError.value = null

      const markerData = {
        label: change.marker.label,
        x: change.marker.x,
        y: change.marker.y,
        stage: change.marker.stage,
        mapId,
      }

      // Use appropriate REST method based on operation type
      switch (change.type) {
        case 'add':
          axios
            .post<MarkerResponse>('/markers', markerData)
            .then((response) => {
              isLoading.value = false
              saveSuccess.value = true
              pendingChanges.value = null

              // Pour une création, mettre à jour l'ID temporaire avec l'ID réel
              if (typeof change.marker.id === 'number' && change.marker.id < 0) {
                const index = markers.value.findIndex((m) => m.id === change.marker.id)
                if (index !== -1) {
                  markers.value[index].id = response.data.marker.id
                }
              }

              setTimeout(() => {
                saveSuccess.value = false
              }, 2000)
            })
            .catch((error) => {
              isLoading.value = false
              saveError.value =
                'Failed to save: ' + (error.response?.data?.error || 'Unknown error')

              setTimeout(() => {
                saveError.value = null
              }, 5000)
            })
          break
        case 'update':
          axios
            .put<MarkerResponse>(`/markers/${change.marker.id}`, markerData)
            .then(() => {
              isLoading.value = false
              saveSuccess.value = true
              pendingChanges.value = null

              setTimeout(() => {
                saveSuccess.value = false
              }, 2000)
            })
            .catch((error) => {
              isLoading.value = false
              saveError.value =
                'Failed to save: ' + (error.response?.data?.error || 'Unknown error')

              setTimeout(() => {
                saveError.value = null
              }, 5000)
            })
          break
        case 'delete':
          axios
            .delete<MarkerResponse>(`/markers/${change.marker.id}`)
            .then(() => {
              isLoading.value = false
              saveSuccess.value = true
              pendingChanges.value = null

              setTimeout(() => {
                saveSuccess.value = false
              }, 2000)
            })
            .catch((error) => {
              isLoading.value = false
              saveError.value =
                'Failed to save: ' + (error.response?.data?.error || 'Unknown error')

              setTimeout(() => {
                saveError.value = null
              }, 5000)
            })
          break
      }
    }, 500) // 500ms delay to debounce changes
  }

  // Add a new marker
  const addMarker = (x: number, y: number, label: string) => {
    const newMarker: Marker = {
      id: nextTempId--,
      x,
      y,
      label,
      stage: getCurrentStage(),
      mapId,
    }

    markers.value.push(newMarker)

    if (autoSave) {
      saveMarkerChange({ type: 'add', marker: newMarker })
    }

    return newMarker
  }

  // Update an existing marker
  const updateMarker = (marker: Marker, newLabel: string) => {
    const index = markers.value.findIndex((m) => m.id === marker.id)
    if (index !== -1) {
      markers.value[index].label = newLabel

      if (autoSave) {
        saveMarkerChange({ type: 'update', marker: markers.value[index] })
      }
    }
  }

  // Delete a marker
  const deleteMarker = (markerId: number | string) => {
    const index = markers.value.findIndex((m) => m.id === markerId)
    if (index !== -1) {
      const markerToDelete = markers.value[index]

      // Remove from local array
      markers.value.splice(index, 1)

      if (autoSave) {
        saveMarkerChange({ type: 'delete', marker: markerToDelete })
      }
    }
  }

  return {
    markers,
    stageMarkers,
    isLoading,
    saveSuccess,
    saveError,
    addMarker,
    updateMarker,
    deleteMarker,
  }
}
