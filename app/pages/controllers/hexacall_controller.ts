import type { HttpContext } from '@adonisjs/core/http'

export default class HexacallController {
  async render({ inertia }: HttpContext) {
    return inertia.render('hexacall/index')
  }
}
