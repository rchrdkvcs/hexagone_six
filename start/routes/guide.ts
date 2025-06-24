import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CreateGuideController = () => import('#guides/controllers/create_guide_controller')
const IndexPublicationController = () => import('#guides/controllers/index_publication_controller')
const IndexGuideController = () => import('#guides/controllers/index_guide_controller')
const ShowGuideController = () => import('#guides/controllers/show_guide_controller')

export default function guideRoutes() {
  router
    .group(() => {
      router.get('/guides', [IndexGuideController, 'render'])
      router.post('/guides', [CreateGuideController, 'execute'])
      router.get('/guides/publications', [IndexPublicationController, 'render'])

      router.get('/guides/:slug', [ShowGuideController, 'render'])
    })
    .use(middleware.silentAuth())
}
