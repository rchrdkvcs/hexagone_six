import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('admin/index')
  }

  public async show({ inertia }: HttpContext) {
    return inertia.render('admin/show')
  }

  public async create({ inertia }: HttpContext) {
    return inertia.render('admin/create')
  }

  public async edit({ inertia }: HttpContext) {
    return inertia.render('admin/edit')
  }
}
