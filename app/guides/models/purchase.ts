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
    prepare: (value: any) => {
      if (value === null || value === undefined) return null
      return typeof value === 'string' ? value : JSON.stringify(value)
    },
    consume: (value: string | null) => {
      if (value === null || value === undefined) return null
      if (typeof value === 'object') return value
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    },
  })
  declare customerData: {
    email?: string
    name?: string
    phone?: string
    address?: any
  } | null

  @column({
    prepare: (value: any) => {
      if (value === null || value === undefined) return null
      return typeof value === 'string' ? value : JSON.stringify(value)
    },
    consume: (value: string | null) => {
      if (value === null || value === undefined) return {}
      if (typeof value === 'object') return value
      try {
        return JSON.parse(value)
      } catch {
        return {}
      }
    },
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
