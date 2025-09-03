import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'

export default class Guide extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare author: string

  @column()
  declare thumbnailUrl: string

  @column()
  declare title: string

  @column()
  declare summary: string

  @column()
  declare markdownContent: string

  @column()
  declare htmlContent: string

  @column()
  declare toc: string

  @column()
  declare slug: string

  @column()
  declare price: number

  @column()
  declare publishedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static generateUuid(guide: Guide) {
    guide.id = crypto.randomUUID()
  }
}
