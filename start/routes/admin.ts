import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AdminController = () => import('#controllers/admin/admin_controller')
const AdminUsersController = () => import('#controllers/admin/admin_users_controller')

export default function adminRoutes() {
  router
    .group(() => {
      router.get('/', [AdminController, 'index'])
      router.get('/users', [AdminUsersController, 'render'])
    })
    .prefix('admin')
    .use([middleware.auth(), middleware.userRole()])
}
