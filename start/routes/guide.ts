import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const EditPublicationController = () =>
  import('#publications/controllers/edit_publication_controller')
const DestroyGuideController = () => import('#guides/controllers/destroy_guide_controller')
const StoreGuideImageController = () => import('#guides/controllers/store_guide_image_controller')
const StorePublicationController = () =>
  import('#publications/controllers/store_publication_controller')
const StoreGuideController = () => import('#guides/controllers/store_guide_controller')
const IndexGuideController = () => import('#guides/controllers/index_guide_controller')
const ShowGuideController = () => import('#guides/controllers/show_guide_controller')
const IndexPublicationController = () =>
  import('../../app/publications/controllers/index_publication_controller.js')
const PaymentsGuideController = () => import('#guides/controllers/payments_guide_controller')

export default function guideRoutes() {
  // Routes publiques (avec détection optionnelle d'utilisateur)
  router.get('/guides', [IndexGuideController, 'render']).use(middleware.silentAuth())
  router.get('/guide/:slug', [ShowGuideController, 'render']).use(middleware.silentAuth())

  // Routes de paiement pour les guides
  router
    .group(() => {
      router.post('/guide/:id/payments/create-checkout', [PaymentsGuideController, 'checkout'])
    })
    .use(middleware.auth())

  // Routes de callback Stripe (nécessitent une authentification)
  router.get('/guide/payment/success', [PaymentsGuideController, 'success']).use(middleware.auth())
  router
    .get('/guide/payment/cancel', [PaymentsGuideController, 'cancel'])
    .use(middleware.silentAuth())

  // Routes d'administration des guides (nécessitent une authentification)
  router
    .group(() => {
      router.get('/p/guides/', [IndexPublicationController, 'render'])
      router.post('/p/guides', [StoreGuideController, 'execute'])
      router.get('/p/guides/ajouter', [StorePublicationController, 'render'])

      router.post('/p/guides/files', [StoreGuideImageController, 'execute'])

      router.get('/p/guides/:id', [EditPublicationController, 'render'])
      router.patch('/p/guides/:id', [EditPublicationController, 'execute'])
      router.delete('/p/guides/:id', [DestroyGuideController, 'execute'])
    })
    .use(middleware.auth())
}
