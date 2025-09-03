import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import crypto from 'node:crypto'
import Marker from '#markers/models/marker'
import Playlist from '#playlists/models/playlist'

interface MapLevel {
  level: number
  name: string
  isDefault?: boolean
}

export default class Map extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column({ prepare: (value) => JSON.stringify(value) })
  declare levels: MapLevel[]

  @hasMany(() => Marker)
  declare markers: HasMany<typeof Marker>

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>

  @beforeCreate()
  static generateUuid(map: Map) {
    map.id = crypto.randomUUID()
  }
}
