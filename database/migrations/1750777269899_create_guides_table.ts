import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guides'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('thumbnail_url').nullable()
      table.string('title').notNullable()
      table.string('summary').notNullable()
      table.text('markdown_content').notNullable()
      table.text('html_content').notNullable()
      table.text('toc').notNullable()
      table.string('slug').notNullable().unique()
      table.decimal('price').notNullable().defaultTo(0)
      table.boolean('is_published').notNullable().defaultTo(false)
      table.timestamp('published_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
