import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.integer('stage_count').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
