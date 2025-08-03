import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchases'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Renommer total_price vers total_amount
      table.renameColumn('total_price', 'total_amount')

      // Ajouter les nouvelles colonnes
      table.string('product_type').notNullable().defaultTo('guide')
      table.string('currency').notNullable().defaultTo('eur')
      table.string('stripe_session_id').notNullable().defaultTo('')
      table.json('customer_data').nullable()
      table.json('metadata').nullable()

      // product_id est déjà nullable dans la migration originale
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Supprimer les nouvelles colonnes
      table.dropColumn('product_type')
      table.dropColumn('currency')
      table.dropColumn('stripe_session_id')
      table.dropColumn('customer_data')
      table.dropColumn('metadata')

      // Restaurer l'ancien nom
      table.renameColumn('total_amount', 'total_price')
    })
  }
}
