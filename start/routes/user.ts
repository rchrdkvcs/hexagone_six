import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ShowUserController = () => import('#users/controllers/show_user_controller')
const UpdateUserController = () => import('#users/controllers/update_user_controller')

export default function userRoutes() {
  router
    .group(() => {
      router.get('/membres/:userSlug', [ShowUserController, 'render'])
      router.post('/membres/:id', [UpdateUserController, 'execute'])
    })
    .use(middleware.silentAuth())
}
