import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const HexaboostController = () => import('../../app/pages/controllers/hexaboost_controller.js')

export default function hexaboostRoutes() {
  router
    .group(() => {
      router.get('/', [HexaboostController, 'render'])
    })
    .use(middleware.silentAuth())
    .prefix('hexaboost')
}
