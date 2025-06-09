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
import hexacallRoutes from '#start/routes/hexacall'
const ShowLanController = () => import('../app/lan/controllers/show_lan_controller.js')
const HomeController = () => import('../app/pages/controllers/home_controller.js')
const IndexLanController = () => import('../app/lan/controllers/index_lan_controller.js')
const ShowLanGalleryController = () =>
  import('../app/lan/controllers/show_lan_gallery_controller.js')

authRoutes()
adminRoutes()
hexacallRoutes()

router
  .group(() => {
    router.get('/', [HomeController, 'render'])

    router.get('/lan', [IndexLanController, 'render'])
    router.get('/lan/:year', [ShowLanController, 'render'])
    router.get('/lan/:year/galleries', [ShowLanGalleryController, 'render'])
  })
  .use(middleware.silentAuth())
