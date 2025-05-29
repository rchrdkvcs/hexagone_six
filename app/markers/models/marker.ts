import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import MarkerSuggest from '#suggestions/models/suggestion'
import Map from '#maps/models/map'
import User from '#users/models/user'

interface MarkerImage {
  url: string
  order?: number
  title?: string
  tag?: string
}

interface Coordinates {
  x: number
  y: number
}

export default class Marker extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare type: 'point' | 'polygone'

  @column({ prepare: (value) => JSON.stringify(value) })
  declare coordinates: Coordinates[]

  @column()
  declare stage: number

  @column({ prepare: (value) => JSON.stringify(value) })
  declare images: MarkerImage[]

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare mapId: string

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
