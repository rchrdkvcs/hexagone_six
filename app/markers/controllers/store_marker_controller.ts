import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'
import vine from '@vinejs/vine'
import Post from '#users/models/post'
import Map from '#maps/models/map'

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

  async execute({ response, request, auth }: HttpContext) {
    const user = await auth.authenticate()

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

      const map = await Map.findOrFail(data.mapId)

      await Post.create({
        userId: user.id,
        category: 'proposition',
        label: data.label,
        markerName: marker.label,
        mapName: map.name,
        mapSlug: map.slug,
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
