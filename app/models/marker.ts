import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Map from '#models/map'
import crypto from 'node:crypto'

export default class Marker extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare x: number

  @column()
  declare y: number

  @column()
  declare stage: number

  @column()
  declare isSuggestion: boolean

  @column()
  declare isDisplayed: boolean

  @column()
  declare isApproved: boolean

  @column()
  declare upVote: boolean

  @column()
  declare downVote: boolean

  @column()
  declare mapId: string

  @belongsTo(() => Map)
  declare map: BelongsTo<typeof Map>

  @column.dateTime({ autoCreate: true })
  declare createdAt: Date

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: Date

  @beforeCreate()
  static generateUuid(marker: Marker) {
    marker.id = crypto.randomUUID()
  }
}
