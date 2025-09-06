import type { HttpContext } from '@adonisjs/core/http'
import Map from '#maps/models/map'
import Playlist from '#playlists/models/playlist'
import drive from '@adonisjs/drive/services/main'
import env from '#start/env'

export default class MapsController {
  private async getImagesUrl() {
    return await drive
      .use()
      .listAll(`static/maps`)
      .then(async (files) => {
        const urls = []

        for (let item of files.objects) {
          if (item.isFile) {
            const url = await item.getUrl()
            urls.push(env.get('APP_URL') + url)
          }
        }

        return urls
      })
  }

  async index({ inertia }: HttpContext) {
    const playlists = await Playlist.all()
    const maps = await Map.query().preload('playlists')
    const imagesUrl = await this.getImagesUrl()

    const serializedMaps = maps.map((map) => {
      const thumbnail = imagesUrl.find((image) => {
        return image.includes(map.slug) && image.includes('thumbnail')
      })

      return {
        ...map.serialize(),
        thumbnail: thumbnail || null,
      }
    })

    return inertia.render('hexacall/maps/index', { maps: serializedMaps, playlists })
  }

  async show({ inertia, params, auth }: HttpContext) {
    const playlists = await Playlist.all()
    const maps = await Map.query().preload('playlists')
    const imagesUrl = await this.getImagesUrl()

    const map = await Map.query()
      .where('slug', params.slug)
      .preload('markers', (markersQuery) => {
        markersQuery.preload('user').preload('suggestions', (suggestionsQuery) => {
          suggestionsQuery.preload('user')
        })
      })
      .firstOrFail()

    const serializedMaps = maps.map((m) => {
      const thumbnail = imagesUrl.find((image) => {
        return image.includes(m.slug) && image.includes('thumbnail')
      })

      return {
        ...m.serialize(),
        thumbnail: thumbnail || null,
      }
    })

    const mapImages = imagesUrl.filter((image) => {
      return image.includes(map.slug) && !image.includes('thumbnail')
    })

    map.$extras = {
      images: mapImages,
    }

    if (auth.user) {
      const suggestionIds = map.markers.flatMap((marker) =>
        marker.suggestions.map((suggestion) => suggestion.id)
      )

      if (suggestionIds.length > 0) {
        await auth.user.load('votes', (votesQuery) => {
          votesQuery.whereIn('suggestionId', suggestionIds)
        })

        const serializedMap = map.serialize()
        serializedMap.images = mapImages

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

        return inertia.render('hexacall/maps/show', {
          map: serializedMap,
          maps: serializedMaps,
          playlists,
        })
      }
    }

    const serializedMap = map.serialize()
    serializedMap.images = mapImages

    return inertia.render('hexacall/maps/show', {
      map: serializedMap,
      maps: serializedMaps,
      playlists,
    })
  }
}
