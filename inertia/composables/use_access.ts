import { useUser } from '~/composables/use_user'

export function useAccess() {
  const user = useUser()

  if (!user.value) return 0

  const roles = user.value.roles || []

  if (roles.includes('developer')) return 4
  if (roles.includes('admin')) return 3
  if (roles.includes('editor')) return 2
  if (roles.includes('user')) return 1

  return 0
}
