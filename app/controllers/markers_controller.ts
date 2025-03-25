import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#models/marker'

export default class MarkersController {
  async store({ response, request }: HttpContext) {
    try {
      const data = request.only(['label', 'x', 'y', 'stage', 'mapId'])
      const marker = await Marker.create(data)

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

  async update({ response, request, params }: HttpContext) {
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

  async destroy({ response, params }: HttpContext) {
    try {
      const { id } = params
      const marker = await Marker.findOrFail(id)
      await marker.delete()

      return response.json({
        success: true,
        id,
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
