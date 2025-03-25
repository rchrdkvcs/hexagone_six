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
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
