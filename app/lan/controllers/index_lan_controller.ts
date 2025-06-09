import type { HttpContext } from '@adonisjs/core/http'

export default class IndexLanController {
  async render({ inertia }: HttpContext) {
    return inertia.render('lan/index')
  }
}
