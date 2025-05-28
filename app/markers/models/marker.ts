import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import MarkerSuggest from '#suggestions/models/suggestion'
import Map from '#maps/models/map'

interface MarkerImage {
  url: string
  order?: number
  title?: string
  tag?: string
}

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

  @column({ prepare: (value) => JSON.stringify(value) })
  declare images: MarkerImage[]

  @belongsTo(() => Map)
  declare map: BelongsTo<typeof Map>

  @hasMany(() => MarkerSuggest)
  declare suggestions: HasMany<typeof MarkerSuggest>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static generateUuid(marker: Marker) {
    marker.id = crypto.randomUUID()
  }
}
