import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Marker from '#models/marker'
import crypto from 'node:crypto'

export default class MarkerSuggest extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare isApproved: boolean

  @column()
  declare upVote: number

  @column()
  declare downVote: number

  @column()
  declare voteRatio: number

  @column()
  declare markerId: string

  @belongsTo(() => Marker)
  declare marker: BelongsTo<typeof Marker>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static generateUuid(markerSuggest: MarkerSuggest) {
    markerSuggest.id = crypto.randomUUID()
  }
}
