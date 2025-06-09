import type { HttpContext } from '@adonisjs/core/http'

export default class SponsorsController {
  async render({ inertia }: HttpContext) {
    return inertia.render('sponsors')
  }
}
