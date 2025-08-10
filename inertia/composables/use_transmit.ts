import { Transmit } from '@adonisjs/transmit-client'
import { ref, onMounted, onUnmounted } from 'vue'

// Instance globale partagée
let globalTransmit: Transmit | null = null
let connectionCount = 0

export function useTransmit() {
  const isConnected = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5

  const connect = () => {
    if (typeof window === 'undefined') return

    connectionCount++

    if (!globalTransmit) {
      try {
        globalTransmit = new Transmit({
          baseUrl: window.location.origin,
        })

        globalTransmit.on('connected', () => {
          isConnected.value = true
          reconnectAttempts.value = 0
        })

        globalTransmit.on('disconnected', () => {
          isConnected.value = false
        })

        globalTransmit.on('reconnecting', () => {

          // Auto-reconnect with exponential backoff
          if (reconnectAttempts.value < maxReconnectAttempts) {
            const delay = Math.pow(2, reconnectAttempts.value) * 1000
            setTimeout(() => {
              reconnectAttempts.value++
              connect()
            }, delay)
          }
        })
      } catch (error) {
        // Failed to initialize Transmit
      }
    } else {
      // Si déjà connecté, mettre à jour le statut
      isConnected.value = true
    }
  }

  const disconnect = () => {
    connectionCount--

    // Ne fermer la connexion que si plus personne ne l'utilise
    if (connectionCount <= 0 && globalTransmit) {
      globalTransmit.close()
      globalTransmit = null
      isConnected.value = false
      connectionCount = 0
    }
  }

  const subscribe = (channel: string, callback: (data: any) => void) => {
    if (!globalTransmit) {
      return () => {}
    }

    const subscription = globalTransmit.subscription(channel)
    subscription.create()
    subscription.onMessage(callback)

    return () => {
      subscription.delete()
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    transmit: globalTransmit,
    isConnected,
    connect,
    disconnect,
    subscribe,
    reconnectAttempts,
  }
}

// Composable spécialisé pour les markers
export function useMarkerUpdates(mapId?: string) {
  const { subscribe } = useTransmit()
  const markers = ref<any[]>([])

  const subscribeToMarkers = () => {
    const unsubscribeCreate = subscribe('markers:create', (data) => {
      if (!mapId || data.marker.map?.id === mapId) {
        markers.value.push(data.marker)
      }
    })

    return unsubscribeCreate
  }

  const subscribeToSuggestions = (markerId: string) => {
    const unsubscribeCreate = subscribe(`markers:${markerId}:suggestions:create`, (data) => {
      // New suggestion received
    })

    const unsubscribeUpdate = subscribe(`markers:${markerId}:suggestions:update`, (data) => {
      // Updated suggestion received
    })

    return () => {
      unsubscribeCreate()
      unsubscribeUpdate()
    }
  }

  return {
    markers,
    subscribeToMarkers,
    subscribeToSuggestions,
  }
}
