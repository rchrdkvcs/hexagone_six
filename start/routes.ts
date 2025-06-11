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
import userRoutes from '#start/routes/user'
import lanRoutes from '#start/routes/lan'

const HomeController = () => import('../app/pages/controllers/home_controller.js')
const SponsorsController = () => import('../app/pages/controllers/sponsors_controller.js')
const MaterialsController = () => import('../app/pages/controllers/materials_controller.js')

authRoutes()
adminRoutes()
userRoutes()
hexacallRoutes()
lanRoutes()

router
  .group(() => {
    router.get('/', [HomeController, 'render'])

    router.get('/partenaires', [SponsorsController, 'render'])
    router.get('/materiel', [MaterialsController, 'render'])
  })
  .use(middleware.silentAuth())
