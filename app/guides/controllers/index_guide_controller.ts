import type { HttpContext } from '@adonisjs/core/http'

export default class IndexGuideController {
  async render({ inertia }: HttpContext) {
    return inertia.render('guide/index')
  }
}
