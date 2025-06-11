import type { HttpContext } from '@adonisjs/core/http'

export default class MaterialsController {
  async render({ inertia }: HttpContext) {
    return inertia.render('materials')
  }
}
