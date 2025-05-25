import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Playlist from '#playlists/models/playlist'

export default class extends BaseSeeder {
  async run() {
    await Playlist.createMany([
      {
        label: 'Standard',
      },
      {
        label: 'Match Rapide',
      },
      {
        label: 'Match a mort par équipe',
      },
      {
        label: 'Classé',
      },
      {
        label: 'E-Sport',
      },
    ])
  }
}
