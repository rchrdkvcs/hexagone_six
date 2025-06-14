import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id')
      table.string('category').notNullable()
      table.string('label').notNullable()
      table.string('marker_name').notNullable()
      table.string('map_name').notNullable()
      table.string('map_slug').notNullable()
      table.string('vote_action').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
