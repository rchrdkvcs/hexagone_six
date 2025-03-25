import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Map from '#models/map'
import Playlist from '#models/playlist'

export default class extends BaseSeeder {
  async run() {
    const maps = await Map.all()
    const playlists = await Playlist.all()

    const playlistDict: Record<string, string> = {}
    for (const playlist of playlists) {
      playlistDict[playlist.label] = playlist.id
    }

    const mapRelations = [
      // Maps compétitives et populaires
      { slug: 'bank', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'border', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'chalet', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'clubhouse', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'coastline', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'kafe', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'oregon', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'outback', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'villa', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'skyscraper', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'themepark', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'emeraldplains', playlists: ['Standard', 'Classé', 'Match Rapide'] },
      { slug: 'nighthavenlabs', playlists: ['Standard', 'Classé', 'Match Rapide'] },

      // Maps semi-compétitives ou récemment retirées de compétition
      { slug: 'consulate', playlists: ['Standard', 'Match Rapide'] },
      { slug: 'kanal', playlists: ['Standard', 'Match Rapide'] },
      { slug: 'fortress', playlists: ['Standard', 'Match Rapide'] },

      // Maps principalement casual
      { slug: 'hereford', playlists: ['Standard'] },
      { slug: 'house', playlists: ['Standard'] },
      { slug: 'plane', playlists: ['Standard'] },
      { slug: 'yacht', playlists: ['Standard'] },
      { slug: 'favela', playlists: ['Standard'] },
      { slug: 'tower', playlists: ['Standard'] },

      // Maps spéciales/événementielles
      { slug: 'stadiumalpha', playlists: ['Standard', 'Match Rapide', 'Match a mort par équipe'] },
      { slug: 'stadiumbravo', playlists: ['Standard', 'Match Rapide'] },
      { slug: 'lair', playlists: ['Standard', 'Match Rapide', 'Match a mort par équipe'] },
      { slug: 'closequarter', playlists: ['Standard', 'Match a mort par équipe'] },
    ]

    for (const relation of mapRelations) {
      const map = maps.find((m) => m.slug === relation.slug)

      if (map) {
        await map.related('playlists').detach()

        const playlistIds = relation.playlists.map((label) => playlistDict[label]).filter(Boolean)

        if (playlistIds.length > 0) {
          await map.related('playlists').attach(playlistIds)
        }
      }
    }
  }
}
