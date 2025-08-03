import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchases'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      
      table.string('product_id').nullable()
      table.string('product_name').notNullable()
      table.string('product_type').notNullable()
      table.integer('total_amount').notNullable()
      table.string('currency').defaultTo('eur')
      table.string('stripe_session_id').notNullable()
      table.json('customer_data').nullable()
      table.json('metadata').defaultTo('{}')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
