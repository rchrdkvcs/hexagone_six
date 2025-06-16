import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'

export default class AdminCallsController {
  public async render({ inertia }: HttpContext) {
    const markers = await Marker.query().preload('user').preload('map').preload('suggestions')

    return inertia.render('admin/calls', { markers })
  }
}
