import type { HttpContext } from '@adonisjs/core/http'
import Guide from '#guides/models/guide'

export default class IndexGuideController {
  async render({ inertia }: HttpContext) {
    const guides = await Guide.all()

    return inertia.render('guide/index', { guides })
  }
}
