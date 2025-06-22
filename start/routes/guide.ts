import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const IndexGuideController = () => import('#guides/controllers/index_guide_controller')

export default function guideRoutes() {
  router
    .group(() => {
      router.get('/guides', [IndexGuideController, 'render'])
    })
    .use(middleware.silentAuth())
}
