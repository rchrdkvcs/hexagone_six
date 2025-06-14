import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#users/models/user'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare category: string

  @column()
  declare label: string

  @column()
  declare markerName: string

  @column()
  declare mapName: string

  @column()
  declare mapSlug: string

  @column()
  declare voteAction: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static generateUuid(post: Post) {
    post.id = crypto.randomUUID()
  }
}
