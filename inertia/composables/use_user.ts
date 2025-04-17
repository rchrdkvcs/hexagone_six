import { usePage } from '@inertiajs/vue3'
import type User from '#models/user'

export function useUser() {
  const page = usePage()
  const user = page.props.user as User | null

  if (!user) return null

  return user
}
