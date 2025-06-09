import router from '@adonisjs/core/services/router'

const HexacallController = () => import('../../app/pages/controllers/hexacall_controller.js')
const StoreMarkerController = () => import('#markers/controllers/store_marker_controller')
const StoreMarkerImageController = () =>
  import('#markers/controllers/store_marker_image_controller')
const UpdateMarkerController = () => import('#markers/controllers/update_marker_controller')
const DeleteMarkerController = () => import('#markers/controllers/delete_marker_controller')
const StoreSuggestionController = () =>
  import('#suggestions/controllers/store_suggestion_controller')
const MapsController = () => import('#maps/controllers/maps_controller')
const UpdateSuggestionController = () =>
  import('#suggestions/controllers/update_suggestion_controller')

export default function hexacallRoutes() {
  router
    .group(() => {
      router.get('/', [HexacallController, 'render'])

      router.get('/cartes', [MapsController, 'index'])
      router.get('/cartes/:slug', [MapsController, 'show'])

      router
        .group(() => {
          router.post('/markers', [StoreMarkerController, 'execute'])
          router.post('/markers/photos', [StoreMarkerImageController, 'execute'])
          router.post('/markers/suggestions', [StoreSuggestionController, 'execute'])

          router.patch('/markers/:id', [UpdateMarkerController, 'execute'])
          router.patch('/markers/suggestions/:id', [UpdateSuggestionController, 'execute'])

          router.delete('/markers/:id', [DeleteMarkerController, 'execute'])
        })
        .prefix('markers')
    })
    .prefix('hexacall')
}
