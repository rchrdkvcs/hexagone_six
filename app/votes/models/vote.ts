import { DateTime } from 'luxon'
import crypto from 'node:crypto'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userIp: string

  @column()
  declare userId: string | null

  @column()
  declare voteType: string

  @column()
  declare markerSuggestId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static generateUuid(vote: Vote) {
    vote.id = crypto.randomUUID()
  }
}
