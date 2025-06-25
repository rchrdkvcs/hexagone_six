import type { HttpContext } from '@adonisjs/core/http'
import Guide from '#guides/models/guide'

export default class IndexGuideController {
  async render({ inertia }: HttpContext) {
    const guides = await Guide.query()
      .whereNotNull('published_at')
      .andWhere('published_at', '<=', new Date())
      .orderBy('published_at', 'desc')
      .limit(4)

    return inertia.render('guide/index', { guides })
  }
}
