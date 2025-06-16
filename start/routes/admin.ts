import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AdminController = () => import('#admin/controllers/admin_controller')
const AdminUsersController = () => import('#admin/controllers/admin_users_controller')
const AdminCallsController = () => import('#admin/controllers/admin_calls_controller')
const AdminSuggestionsController = () => import('#admin/controllers/admin_suggestions_controller')
const AdminVotesController = () => import('#admin/controllers/admin_votes_controller')

export default function adminRoutes() {
  router
    .group(() => {
      router.get('/', [AdminController, 'index'])
      router.get('/utilisateurs', [AdminUsersController, 'render'])
      router.get('/calls', [AdminCallsController, 'render'])
      router.get('/suggestions', [AdminSuggestionsController, 'render'])
      router.get('/votes', [AdminVotesController, 'render'])
    })
    .prefix('admin')
    .use([middleware.auth(), middleware.userRole()])
}
