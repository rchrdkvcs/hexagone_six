/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const MapsController = () => import('#controllers/maps_controller')

router.on('/').renderInertia('home')

router.get('/cartes', [MapsController, 'index'])
router.get('/cartes/:slug', [MapsController, 'show'])
router.post('/markers', [MapsController, 'store'])
