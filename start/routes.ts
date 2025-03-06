/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import MapsController from "#controllers/maps_controller";

router.on('/').renderInertia('home')

router.get('/cartes', [MapsController, 'index'])
router.get('/cartes/:name', [MapsController, 'show'])
