import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Marker from '#models/marker'
import Playlist from '#models/playlist'

export default class Map extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare ref: string

  @column()
  declare stageCount: number

  @hasMany(() => Marker)
  declare markers: HasMany<typeof Marker>

  @hasMany(() => Playlist)
  declare playlists: HasMany<typeof Playlist>
}
