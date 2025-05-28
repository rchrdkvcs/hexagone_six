import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import crypto from 'node:crypto'
import Marker from '#markers/models/marker'
import Playlist from '#playlists/models/playlist'

interface MapImage {
  url: string
  order?: number
  title?: string
  tag?: string
}

export default class Map extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare stageCount: number

  @column({ prepare: (value) => JSON.stringify(value) })
  declare images: MapImage[]

  @hasMany(() => Marker)
  declare markers: HasMany<typeof Marker>

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>

  @beforeCreate()
  static generateUuid(map: Map) {
    map.id = crypto.randomUUID()
  }
}
