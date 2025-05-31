import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'
import vine from '@vinejs/vine'

export default class StoreMarkerController {
  static validator = vine.compile(
    vine.object({
      mapId: vine.string().uuid(),
      userId: vine.string().uuid(),
      label: vine.string().minLength(3).maxLength(30),
      type: vine.enum(['point', 'polygone']),
      stage: vine.number(),
      coordinates: vine.array(
        vine.object({
          x: vine.number(),
          y: vine.number(),
        })
      ),
    })
  )

  async execute({ response, request }: HttpContext) {
    try {
      const data = await request.validateUsing(StoreMarkerController.validator)
      const { id } = await Marker.create({
        ...data,
        userIp: request.ip(),
      })

      const marker = await Marker.findOrFail(id)

      await marker.load('user')
      await marker.load('suggestions', (query) => {
        query.preload('user', (userQuery) => {
          userQuery.preload('votes')
        })
      })

      return response.status(201).json({
        success: true,
        marker,
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
