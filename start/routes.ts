/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const SuggestionsController = () => import('#controllers/suggestions_controller')
const MapsController = () => import('#controllers/maps_controller')
const MarkersController = () => import('#controllers/markers_controller')

router.on('/').renderInertia('home')

router.get('/cartes', [MapsController, 'index'])
router.get('/cartes/:slug', [MapsController, 'show'])

router.post('/markers', [MarkersController, 'store'])
router.patch('/markers/:id', [MarkersController, 'update'])
router.delete('/markers/:id', [MarkersController, 'destroy'])

router.get('/markers/suggestions', [SuggestionsController, 'index'])
router.post('/markers/suggestions', [SuggestionsController, 'store'])
router.patch('/markers/suggestions/:id', [SuggestionsController, 'update'])
router.delete('/markers/suggestions/:id', [SuggestionsController, 'destroy'])
