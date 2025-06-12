import type { HttpContext } from '@adonisjs/core/http'

export default class PcClutchController {
  async render({ inertia }: HttpContext) {
    return inertia.render('pc_clutch')
  }
}
