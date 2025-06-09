import type { HttpContext } from '@adonisjs/core/http'

export default class ShowLanController {
  async render({ inertia }: HttpContext) {
    return inertia.render('lan/show')
  }
}
