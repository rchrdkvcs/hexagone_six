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

import authRoutes from '#start/routes/auth'
import adminRoutes from '#start/routes/admin'

authRoutes()
adminRoutes()

const SuggestionsController = () => import('#controllers/suggestions_controller')
const MapsController = () => import('#controllers/maps_controller')
const MarkersController = () => import('#controllers/markers_controller')

router
  .group(() => {
    router.on('/').renderInertia('home')

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
  })
  .use(middleware.silentAuth())
