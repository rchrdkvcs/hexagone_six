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
import hexaboostRoutes from '#start/routes/hexaboost'
import guideRoutes from '#start/routes/guide'

const HomeController = () => import('../app/pages/controllers/home_controller.js')
const SponsorsController = () => import('../app/pages/controllers/sponsors_controller.js')
const PcClutchController = () => import('../app/pages/controllers/pc_clutch_controller.js')
const PaymentsController = () => import('../app/payments/controllers/payments_controller.js')
const HelpController = () => import('../app/pages/controllers/help_controller.js')

authRoutes()
adminRoutes()
userRoutes()
hexacallRoutes()
lanRoutes()
hexaboostRoutes()
guideRoutes()

router
  .group(() => {
    router.get('/', [HomeController, 'render'])

    router.get('/partenaires', [SponsorsController, 'render'])
    router.get('/pc-clutch', [PcClutchController, 'render'])
    router.get('/aide', [HelpController, 'render'])

    router.post('/payments/create-checkout', [PaymentsController, 'checkout'])
    router.get('/payment/success', [PaymentsController, 'success'])
    router.get('/payment/cancel', [PaymentsController, 'cancel'])
  })
  .use(middleware.silentAuth())
