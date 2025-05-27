import type { HttpContext } from '@adonisjs/core/http'
import Map from '#maps/models/map'
import Playlist from '#playlists/models/playlist'

export default class MapsController {
  async index({ inertia }: HttpContext) {
    const playlists = await Playlist.all()
    const maps = await Map.query().preload('playlists')

    return inertia.render('maps/index', { maps, playlists })
  }

  async show({ inertia, params }: HttpContext) {
    const map = await Map.findByOrFail('slug', params.slug)

    await map.load('markers', (query) => {
      query.preload('suggestions', (suggestionQuery) => {
        suggestionQuery.preload('user', (userQuery) => {
          userQuery.preload('votes')
        })
      })
    })

    return inertia.render('maps/show', { map })
  }
}
