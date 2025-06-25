import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const StoreGuideImageController = () => import('#guides/controllers/store_guide_image_controller')
const StorePublicationController = () =>
  import('#publications/controllers/store_publication_controller')
const StoreGuideController = () => import('#guides/controllers/store_guide_controller')
const IndexGuideController = () => import('#guides/controllers/index_guide_controller')
const ShowGuideController = () => import('#guides/controllers/show_guide_controller')
const IndexPublicationController = () =>
  import('../../app/publications/controllers/index_publication_controller.js')

export default function guideRoutes() {
  router.get('/guides', [IndexGuideController, 'render']).use(middleware.silentAuth())

  router
    .group(() => {
      router.post('/guides', [StoreGuideController, 'execute'])
      router.post('/guides/files', [StoreGuideImageController, 'execute'])

      router.get('/guides/publications', [IndexPublicationController, 'render'])
      router.get('/guides/publications/ajouter', [StorePublicationController, 'render'])

      router.get('/guides/:slug', [ShowGuideController, 'render'])
    })
    .use(middleware.auth())
}
