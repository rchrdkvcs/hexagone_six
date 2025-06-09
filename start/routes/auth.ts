import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RegistersController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const OauthController = () => import('#auth/controllers/oauth_controller')

export default function authRoutes() {
  router
    .group(() => {
      router.get('/login', [LoginController, 'render'])
      router.post('/login', [LoginController, 'execute'])

      router.get('/register', [RegistersController, 'render'])
      router.post('/register', [RegistersController, 'execute'])

      router.get('/:provider/redirect', [OauthController, 'render'])
      router.get('/:provider/callback', [OauthController, 'execute'])
    })
    .use(middleware.guest())

  router.get('/logout', [LogoutController, 'execute'])
}
