import type { HttpContext } from '@adonisjs/core/http'
import Map from '#models/map'
import Playlist from '#models/playlist'
import Marker from '#models/marker'

export default class MapsController {
  async index({ inertia }: HttpContext) {
    const playlists = await Playlist.all()
    const maps = await Map.query().preload('playlists')

    return inertia.render('maps/index', { maps, playlists })
  }

  async show({ inertia, params }: HttpContext) {
    const map = await Map.findByOrFail('slug', params.slug)
    await map.load('markers')

    return inertia.render('maps/show', { map })
  }

  async store({ response, request }: HttpContext) {
    const { markers } = request.only(['markers'])

    await Marker.createMany([...markers])

    return response.redirect().back()
  }
}
