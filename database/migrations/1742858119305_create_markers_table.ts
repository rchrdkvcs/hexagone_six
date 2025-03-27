import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'markers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('label').notNullable()
      table.float('x').notNullable()
      table.float('y').notNullable()
      table.integer('stage').notNullable()
      table.uuid('map_id').nullable()
      table.boolean('is_suggestion').defaultTo(false)
      table.boolean('is_displayed').defaultTo(false)
      table.boolean('is_approved').defaultTo(false)
      table.integer('up_vote').defaultTo(0)
      table.integer('down_vote').defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
