import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'

export default class DeleteMarkerController {
  async execute({ response, params }: HttpContext) {
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
