import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'

export default class VoteLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userIp: string

  @column()
  declare voteType: string

  @column()
  declare markerSuggestId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static generateUuid(vote_log: VoteLog) {
    vote_log.id = crypto.randomUUID()
  }
}
