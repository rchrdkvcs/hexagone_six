/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AdminController = () => import('#controllers/admin/admin_controller')

const SuggestionsController = () => import('#controllers/suggestions_controller')
const MapsController = () => import('#controllers/maps_controller')
const MarkersController = () => import('#controllers/markers_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegistersController = () => import('#controllers/auth/registers_controller')

router.on('/').renderInertia('home')

router.get('/login', [LoginController, 'render'])
router.post('/login', [LoginController, 'execute'])

router.get('/register', [RegistersController, 'render'])
router.post('/register', [RegistersController, 'execute'])

router
  .group(() => {
    router.get('/cartes', [MapsController, 'index'])
    router.get('/cartes/:slug', [MapsController, 'show'])

    router
      .group(() => {
        router.post('/markers', [MarkersController, 'store'])
        router.patch('/markers/:id', [MarkersController, 'update'])
        router.delete('/markers/:id', [MarkersController, 'destroy'])
      })
      .use([middleware.auth(), middleware.userRole()])

    router.get('/markers/suggestions', [SuggestionsController, 'index'])
    router.post('/markers/suggestions', [SuggestionsController, 'store'])
    router.patch('/markers/suggestions/:id', [SuggestionsController, 'update'])
    router.delete('/markers/suggestions/:id', [SuggestionsController, 'destroy'])

    router
      .group(() => {
        router.get('/', [AdminController, 'index'])
      })
      .prefix('admin')
      .use([middleware.auth(), middleware.userRole()])
  })
  .use(middleware.silentAuth())
