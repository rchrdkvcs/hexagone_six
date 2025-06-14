import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Map from '#maps/models/map'

export default class extends BaseSeeder {
  async run() {
    await Map.createMany([
      {
        slug: 'stadiumalpha',
        name: 'Stade Alpha',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'stadiumbravo',
        name: 'Stade Bravo',
        levels: [
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'lair',
        name: 'Repaire',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'nighthavenlabs',
        name: 'Laboratoires Nighthaven',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'closequarter',
        name: 'Close Quarter',
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
        ],
      },
      {
        slug: 'bank',
        name: 'Banque',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'border',
        name: 'Frontière',
        levels: [
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'chalet',
        name: 'Chalet',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'clubhouse',
        name: 'Clubhouse',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'coastline',
        name: 'Littoral',
        levels: [
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'consulate',
        name: 'Consulat',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'kafe',
        name: 'Café Dostoyevsky',
        levels: [
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'kanal',
        name: 'Canal',
        levels: [
          { level: -2, name: 'Sous-sol -2', isDefault: false },
          { level: -1, name: 'Sous-sol -1', isDefault: false },
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'oregon',
        name: 'Oregon',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'skyscraper',
        name: 'Gratte-ciel',
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'themepark',
        name: "Parc d'attractions",
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'villa',
        name: 'Villa',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'outback',
        name: 'Outback',
        levels: [
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'fortress',
        name: 'Forteresse',
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'hereford',
        name: 'Base Hereford',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: '3ème étage', isDefault: false },
          { level: 4, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'house',
        name: 'Maison',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'plane',
        name: 'Avion Présidentiel',
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: '3ème étage', isDefault: false },
          { level: 4, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'yacht',
        name: 'Yacht',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'favela',
        name: 'Favela',
        levels: [
          { level: -1, name: 'Sous-sol', isDefault: false },
          { level: 0, name: 'Rez-de-chaussée', isDefault: true },
          { level: 1, name: '1er étage', isDefault: false },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'tower',
        name: 'Tour',
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
      {
        slug: 'emeraldplains',
        name: 'Plaines Émeraude',
        levels: [
          { level: 1, name: '1er étage', isDefault: true },
          { level: 2, name: '2ème étage', isDefault: false },
          { level: 3, name: 'Toit', isDefault: false },
        ],
      },
    ])
  }
}
