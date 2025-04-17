import router from '@adonisjs/core/services/router'

const LoginController = () => import('#controllers/auth/login_controller')
const RegistersController = () => import('#controllers/auth/registers_controller')
const OauthController = () => import('#controllers/auth/oauth_controller')

export default function authRoutes() {
  router.get('/login', [LoginController, 'render'])
  router.post('/login', [LoginController, 'execute'])

  router.get('/register', [RegistersController, 'render'])
  router.post('/register', [RegistersController, 'execute'])

  router.get('/:provider/redirect', [OauthController, 'render'])
  router.get('/:provider/callback', [OauthController, 'execute'])

  router.get('/logout', [LoginController, 'logout'])
}
