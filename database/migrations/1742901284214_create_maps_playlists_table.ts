import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'map_playlist'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('map_id').references('id').inTable('maps').onDelete('CASCADE')
      table.uuid('playlist_id').references('id').inTable('playlists').onDelete('CASCADE')
      table.primary(['map_id', 'playlist_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
