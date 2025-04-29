import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import crypto from 'node:crypto'
import Map from '#maps/models/map'

export default class Playlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @manyToMany(() => Map)
  declare maps: ManyToMany<typeof Map>

  @beforeCreate()
  static generateUuid(playlist: Playlist) {
    playlist.id = crypto.randomUUID()
  }
}
