import type { HttpContext } from '@adonisjs/core/http'

export default class IndexPublicationController {
  async render({ inertia }: HttpContext) {
    return inertia.render('guide/publication/index')
  }
}
