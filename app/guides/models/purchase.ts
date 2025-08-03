import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import User from '#users/models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Purchase extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare productName: string

  @column()
  declare productId: string | undefined

  @column()
  declare productType: 'guide' | 'hexaboost' | 'subscription'

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare totalAmount: number

  @column()
  declare currency: string

  @column()
  declare stripeSessionId: string

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare customerData: {
    email?: string
    name?: string
    phone?: string
    address?: any
  }

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare metadata: Record<string, any>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static generateUuid(purchase: Purchase) {
    purchase.id = crypto.randomUUID()
  }
}
