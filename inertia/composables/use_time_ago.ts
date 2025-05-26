import { onMounted, onUnmounted, ref, Ref } from 'vue'
import type { DateTime } from 'luxon'

export function formatTimeAgo(date: Date | DateTime | string): string {
  if (typeof date === 'string') {
    date = new Date(date)
  } else if (typeof date === 'object' && date && 'toJSDate' in date) {
    // Handle Luxon DateTime
    date = date.toJSDate()
  }

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffSeconds < 5) return "à l'instant"
  if (diffSeconds < 60) return `Il y a ${diffSeconds} secondes`
  if (diffMinutes === 1) return `Il y a 1 minute`
  if (diffMinutes < 60) return `Il y a ${diffMinutes} minutes`
  if (diffHours === 1) return `Il y a 1 heure`
  if (diffHours < 24) return `Il y a ${diffHours} heures`
  if (diffDays === 1) return `Il y a 1 jour`
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffWeeks === 1) return `Il y a 1 semaine`
  if (diffWeeks < 4) return `Il y a ${diffWeeks} semaines`
  if (diffMonths === 1) return `Il y a 1 mois`
  if (diffMonths < 12) return `Il y a ${diffMonths} mois`
  if (diffYears === 1) return `Il y a 1 an`
  return `Il y a ${diffYears} ans`
}

export function useTimeAgo(date: Date | DateTime | string): { formattedTime: Ref<string> } {
  const formattedTime = ref('')
  let intervalId: NodeJS.Timeout | null = null

  onMounted(() => {
    const updateTime = () => {
      formattedTime.value = formatTimeAgo(date)
    }

    updateTime()
    intervalId = setInterval(updateTime, 30000)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return { formattedTime }
}
