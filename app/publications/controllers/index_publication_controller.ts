import type { HttpContext } from '@adonisjs/core/http'
import Guide from '#guides/models/guide'

export default class IndexPublicationController {
  async render({ inertia }: HttpContext) {
    const guides = await Guide.query().orderBy('published_at', 'asc')

    return inertia.render('guide/publication/index', { guides })
  }
}
