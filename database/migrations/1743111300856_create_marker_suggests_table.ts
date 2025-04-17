import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'marker_suggests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.uuid('user_id').nullable()
      table.string('label').notNullable()
      table.boolean('is_approved').notNullable().defaultTo(false)
      table.integer('up_vote').notNullable().defaultTo(0)
      table.integer('down_vote').notNullable().defaultTo(0)
      table.float('vote_ratio').notNullable().defaultTo(0)
      table.uuid('marker_id').references('markers.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
