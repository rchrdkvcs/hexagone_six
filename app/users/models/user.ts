import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import crypto from 'node:crypto'
import MarkerSuggest from '#suggestions/models/suggestion'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from '#users/models/post'

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

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare provider: string

  @column()
  declare provider_id: string

  @column()
  declare roles: string[]

  // TODO : Update migration

  @column()
  declare description: string

  @column()
  declare avatarUrl: string

  @column()
  declare followersCount: number

  @column()
  declare followingCount: number

  @hasMany(() => MarkerSuggest)
  declare suggestions: HasMany<typeof MarkerSuggest>

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static generateUuid(user: User) {
    user.id = crypto.randomUUID()
  }
}
