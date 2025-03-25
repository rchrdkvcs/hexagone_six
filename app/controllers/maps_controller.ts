import type { HttpContext } from '@adonisjs/core/http'
import Map from '#models/map'

export default class MapsController {
  index({ inertia }: HttpContext) {
    const maps = Map.all()

    return inertia.render('maps/index', { maps })
  }

  async show({ inertia, params }: HttpContext) {
    const map = await Map.query().where('slug', params.slug).preload('markers')

    return inertia.render('maps/show', { map })
  }
}
