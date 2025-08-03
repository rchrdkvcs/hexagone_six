import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import crypto from 'node:crypto'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Suggestion from '#suggestions/models/suggestion'
import Post from '#users/models/post'
import Vote from '#votes/models/vote'
import Purchase from '#guides/models/purchase'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column()
  declare userName: string

  @column()
  declare userSlug: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare provider: string

  @column()
  declare provider_id: string

  @column()
  declare roles: string[]

  @column()
  declare bio: string

  @column()
  declare avatarUrl: string

  @hasMany(() => Suggestion)
  declare suggestions: HasMany<typeof Suggestion>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @hasMany(() => Purchase)
  declare purchases: HasMany<typeof Purchase>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static generateUuid(user: User) {
    user.id = crypto.randomUUID()
  }
}
