import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'
import vine from '@vinejs/vine'

export default class AdminCallsController {
  static validator = vine.compile(
    vine.object({
      userId: vine.string().uuid().optional(),
      mapId: vine.string().uuid().optional(),
      callId: vine.string().uuid().optional(),
    })
  )
  public async render({ inertia, params }: HttpContext) {
    const { userId, mapId, callId } = await AdminCallsController.validator.validate(params)

    const markers = await Marker.query()
      .where((query) => {
        if (userId) {
          query.where('user_id', userId)
        }
        if (mapId) {
          query.where('map_id', mapId)
        }
        if (callId) {
          query.where('id', callId)
        }
      })
      .preload('user')
      .preload('map')
      .preload('suggestions')

    return inertia.render('admin/calls', { markers })
  }
}
