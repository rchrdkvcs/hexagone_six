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

const StoreMarkerImageController = () =>
  import('#markers/controllers/store_marker_image_controller')

const UpdateUserController = () => import('#users/controllers/update_user_controller')

const ShowUserController = () => import('#users/controllers/show_user_controller')

const StoreSuggestionController = () =>
  import('#suggestions/controllers/store_suggestion_controller')
const UpdateSuggestionController = () =>
  import('#suggestions/controllers/update_suggestion_controller')

const MapsController = () => import('#maps/controllers/maps_controller')
const MarkersController = () => import('#markers/controllers/markers_controller')

authRoutes()
adminRoutes()

router
  .group(() => {
    router.on('/').renderInertia('home')

    router.get('/cartes', [MapsController, 'index'])
    router.get('/cartes/:slug', [MapsController, 'show'])

    router
      .group(() => {
        router.post('/markers', [MarkersController, 'store'])
        router.post('/markers/photos', [StoreMarkerImageController, 'execute'])
        router.patch('/markers/:id', [MarkersController, 'update'])
        router.delete('/markers/:id', [MarkersController, 'destroy'])
      })
      .use([middleware.auth(), middleware.userRole()])

    router.post('/markers/suggestions', [StoreSuggestionController, 'execute'])
    router.patch('/markers/suggestions/:id', [UpdateSuggestionController, 'execute'])

    router.get('/membres/:userName', [ShowUserController, 'render'])
    router.post('/membres/:id', [UpdateUserController, 'execute'])
  })
  .use(middleware.silentAuth())
