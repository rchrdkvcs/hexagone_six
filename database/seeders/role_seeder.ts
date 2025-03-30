import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      { name: 'user', access: 0 },
      { name: 'editor', access: 1 },
      { name: 'admin', access: 2 },
      { name: 'developer', access: 3 },
    ])
  }
}
