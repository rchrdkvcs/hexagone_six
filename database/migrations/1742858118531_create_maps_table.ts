import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('ref').notNullable()
      table.integer('stage_count').notNullable()
      table.uuid('marker_id').references('id').inTable('markers').onDelete('CASCADE')
      table.uuid('playlist_id').references('id').inTable('playlists').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
