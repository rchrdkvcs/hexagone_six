import { useUser } from '~/composables/use_user'

export function useAccess(role: string) {
  const user = useUser()

  if (!user.value) return false

  const roles = user.value.roles || []

  return roles.includes(role)
}
