import type { HttpContext } from '@adonisjs/core/http'

export default class HelpController {
  async render({ inertia }: HttpContext) {
    return inertia.render('help')
  }
}
