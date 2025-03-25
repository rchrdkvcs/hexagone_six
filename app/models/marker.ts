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
  declare mapId: string

  @belongsTo(() => Map)
  declare map: BelongsTo<typeof Map>

  @beforeCreate()
  static generateUuid(marker: Marker) {
    marker.id = crypto.randomUUID()
  }
}
