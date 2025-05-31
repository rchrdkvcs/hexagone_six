import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'markers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('label').notNullable()
      table.enu('type', ['point', 'polygone']).notNullable()
      table.json('coordinates').notNullable().defaultTo([])
      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      table.string('user_ip').notNullable()
      table.integer('stage').notNullable()
      table.json('images').nullable().defaultTo([])
      table.uuid('map_id').references('maps.id').onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
