import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Map from '#models/map'

export default class extends BaseSeeder {
  async run() {
    await Map.createMany([
      {
        slug: 'stadiumalpha',
        name: 'Stade Alpha',
        stageCount: 5,
      },
      {
        slug: 'stadiumbravo',
        name: 'Stade Bravo',
        stageCount: 4,
      },
      {
        slug: 'lair',
        name: 'Repaire',
        stageCount: 4,
      },
      {
        slug: 'nighthavenlabs',
        name: 'Laboratoires Nighthaven',
        stageCount: 4,
      },
      {
        slug: 'closequarter',
        name: 'Close Quarter',
        stageCount: 2,
      },
      {
        slug: 'bank',
        name: 'Banque',
        stageCount: 4,
      },
      {
        slug: 'border',
        name: 'Frontière',
        stageCount: 3,
      },
      {
        slug: 'chalet',
        name: 'Chalet',
        stageCount: 4,
      },
      {
        slug: 'clubhouse',
        name: 'Clubhouse',
        stageCount: 4,
      },
      {
        slug: 'coastline',
        name: 'Littoral',
        stageCount: 3,
      },
      {
        slug: 'consulate',
        name: 'Consulat',
        stageCount: 4,
      },
      {
        slug: 'kafe',
        name: 'Café Dostoyevsky',
        stageCount: 4,
      },
      {
        slug: 'kanal',
        name: 'Canal',
        stageCount: 5,
      },
      {
        slug: 'oregon',
        name: 'Oregon',
        stageCount: 5,
      },
      {
        slug: 'skyscraper',
        name: 'Gratte-ciel',
        stageCount: 3,
      },
      {
        slug: 'themepark',
        name: "Parc d'attractions",
        stageCount: 3,
      },
      {
        slug: 'villa',
        name: 'Villa',
        stageCount: 5,
      },
      {
        slug: 'outback',
        name: 'Outback',
        stageCount: 3,
      },
      {
        slug: 'fortress',
        name: 'Forteresse',
        stageCount: 3,
      },
      {
        slug: 'hereford',
        name: 'Base Hereford',
        stageCount: 5,
      },
      {
        slug: 'house',
        name: 'Maison',
        stageCount: 4,
      },
      {
        slug: 'plane',
        name: 'Avion présslugentiel',
        stageCount: 4,
      },
      {
        slug: 'yacht',
        name: 'Yacht',
        stageCount: 5,
      },
      {
        slug: 'favela',
        name: 'Favela',
        stageCount: 5,
      },
      {
        slug: 'tower',
        name: 'Tour',
        stageCount: 4,
      },
      {
        slug: 'emeraldplains',
        name: 'Plaines Émeraude',
        stageCount: 3,
      },
    ])
  }
}
