import type { HttpContext } from '@adonisjs/core/http'

export default class MapsController {
  index({ inertia }: HttpContext) {
    return inertia.render('maps/index')
  }

  show({ inertia, params }: HttpContext) {
    return inertia.render('maps/show', { id: params.id })
  }
}
