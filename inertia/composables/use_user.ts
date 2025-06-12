import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import User from '#users/models/user'

export function useUser() {
  const page = usePage()
  return computed(() => page.props.user as User | null)
}
