import { usePage } from '@inertiajs/vue3'
import type User from '../../app/users/models/user'
import { computed } from 'vue'

export function useUser() {
  const page = usePage()
  return computed(() => page.props.user as User | null)
}
