import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const IndexLanController = () => import('../../app/lan/controllers/index_lan_controller.js')
const ShowLanController = () => import('../../app/lan/controllers/show_lan_controller.js')
const ShowLanGalleryController = () =>
  import('../../app/lan/controllers/show_lan_gallery_controller.js')

export default function lanRoutes() {
  router
    .group(() => {
      router.get('/lan', [IndexLanController, 'render'])
      router.get('/lan/:year', [ShowLanController, 'render'])
      router.get('/lan/:year/galleries', [ShowLanGalleryController, 'render'])
    })
    .use(middleware.silentAuth())
}
