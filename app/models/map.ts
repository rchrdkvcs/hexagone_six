import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Marker from '#models/marker'
import Playlist from '#models/playlist'
import crypto from 'node:crypto'

export default class Map extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare stageCount: number

  @column()
  declare playlistId: string | null

  @hasMany(() => Marker)
  declare markers: HasMany<typeof Marker>

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>

  @beforeCreate()
  static generateUuid(map: Map) {
    map.id = crypto.randomUUID()
  }
}
