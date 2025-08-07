import type { HttpContext } from '@adonisjs/core/http'
import Map from '#maps/models/map'
import Playlist from '#playlists/models/playlist'

export default class MapsController {
  async index({ inertia }: HttpContext) {
    const playlists = await Playlist.all()
    const maps = await Map.query().preload('playlists')

    return inertia.render('hexacall/maps/index', { maps, playlists })
  }

  async show({ inertia, params, auth }: HttpContext) {
    const playlists = await Playlist.all()
    const maps = await Map.query().preload('playlists')

    const map = await Map.query()
      .where('slug', params.slug)
      .preload('markers', (markersQuery) => {
        markersQuery.preload('user').preload('suggestions', (suggestionsQuery) => {
          suggestionsQuery.preload('user')
        })
      })
      .firstOrFail()

    if (auth.user) {
      const suggestionIds = map.markers.flatMap((marker) =>
        marker.suggestions.map((suggestion) => suggestion.id)
      )

      if (suggestionIds.length > 0) {
        await auth.user.load('votes', (votesQuery) => {
          votesQuery.whereIn('suggestionId', suggestionIds)
        })

        // Sérialiser la map pour pouvoir ajouter userVotes
        const serializedMap = map.serialize()

        for (const marker of serializedMap.markers) {
          for (const suggestion of marker.suggestions) {
            const suggestionVotes = auth.user.votes.filter(
              (vote) => vote.suggestionId === suggestion.id
            )
            suggestion.userVotes = suggestionVotes.map((vote) => ({
              voteType: vote.voteType,
            }))
          }
        }

        return inertia.render('hexacall/maps/show', { map: serializedMap, maps, playlists })
      }
    }

    return inertia.render('hexacall/maps/show', { map, maps, playlists })
  }
}
