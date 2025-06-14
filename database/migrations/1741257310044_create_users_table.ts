import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email').notNullable()
      table.string('user_name').notNullable().unique()
      table.string('user_slug').notNullable().unique()
      table.string('bio').nullable()
      table.string('avatar_url').nullable()
      table.string('password').nullable()
      table.string('provider').nullable()
      table.string('provider_id').nullable().unique()
      table.json('roles').defaultTo('["user"]')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
