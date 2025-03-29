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

type PendingChange = { type: 'add' | 'update' | 'delete'; marker: Marker } | null

export function use_markers(
  initialMarkers: Marker[],
  mapId: string,
  getCurrentStage: () => number,
  autoSave = false
) {
  const markers = ref<Marker[]>([...initialMarkers])
  const pendingChanges = ref<PendingChange>(null)
  const isLoading = ref(false)
  const saveSuccess = ref(false)
  const saveError = ref<string | null>(null)

  let nextTempId = -1
  let saveTimeout: NodeJS.Timeout | null = null

  const stageMarkers = computed(() => {
    return markers.value.filter((m) => m.stage === getCurrentStage())
  })

  const handleApiResponse = (successCallback: () => void, error: any) => {
    isLoading.value = false

    if (error) {
      saveError.value = 'Failed to save: ' + (error.response?.data?.error || 'Unknown error')
      setTimeout(() => (saveError.value = null), 5000)
      return
    }

    saveSuccess.value = true
    pendingChanges.value = null
    successCallback()
    setTimeout(() => (saveSuccess.value = false), 2000)
  }

  const saveMarkerChange = (change: { type: 'add' | 'update' | 'delete'; marker: Marker }) => {
    if (saveTimeout) clearTimeout(saveTimeout)

    pendingChanges.value = change

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

      const updateLocalId = () => {
        if (typeof change.marker.id === 'number' && change.marker.id < 0) {
          const index = markers.value.findIndex((m) => m.id === change.marker.id)
          if (index !== -1) {
            markers.value[index].id = pendingChanges.value?.marker?.id || change.marker.id
          }
        }
      }

      switch (change.type) {
        case 'add':
          axios
            .post<MarkerResponse>('/markers', markerData)
            .then((response) => {
              pendingChanges.value = { ...change, marker: response.data.marker }
              handleApiResponse(updateLocalId, null)
            })
            .catch(handleApiResponse.bind(null, () => {}))
          break

        case 'update':
          axios
            .patch<MarkerResponse>(`/markers/${change.marker.id}`, markerData)
            .then(() => handleApiResponse(() => {}, null))
            .catch(handleApiResponse.bind(null, () => {}))
          break

        case 'delete':
          axios
            .delete<MarkerResponse>(`/markers/${change.marker.id}`)
            .then(() => handleApiResponse(() => {}, null))
            .catch(handleApiResponse.bind(null, () => {}))
          break
      }
    }, 500)
  }

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
    if (autoSave) saveMarkerChange({ type: 'add', marker: newMarker })
    return newMarker
  }

  const updateMarker = (marker: Marker, newLabel: string) => {
    const index = markers.value.findIndex((m) => m.id === marker.id)
    if (index !== -1) {
      markers.value[index].label = newLabel
      if (autoSave) saveMarkerChange({ type: 'update', marker: markers.value[index] })
    }
  }

  const deleteMarker = (markerId: number | string) => {
    const index = markers.value.findIndex((m) => m.id === markerId)
    if (index !== -1) {
      const markerToDelete = markers.value[index]
      markers.value.splice(index, 1)
      if (autoSave) saveMarkerChange({ type: 'delete', marker: markerToDelete })
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
