import type { HttpContext } from '@adonisjs/core/http'

export default class StorePublicationController {
  async render({ inertia }: HttpContext) {
    return inertia.render('guide/publication/create')
  }
}
