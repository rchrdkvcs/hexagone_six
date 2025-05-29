import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'

export default class UpdateMarkerController {
  async execute({ response, request, params }: HttpContext) {
    try {
      const { id } = params
      const data = request.only(['label', 'x', 'y', 'stage', 'mapId'])

      const marker = await Marker.findOrFail(id)
      marker.merge(data)
      await marker.save()

      return response.json({
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
