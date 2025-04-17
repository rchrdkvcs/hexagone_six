import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('admin/index')
  }
}
