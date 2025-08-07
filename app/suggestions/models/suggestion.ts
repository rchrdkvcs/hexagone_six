import { DateTime } from 'luxon'
import {
  afterDelete,
  afterSave,
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import crypto from 'node:crypto'
import Marker from '#markers/models/marker'
import User from '#users/models/user'

export default class Suggestion extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare isApproved: boolean

  @column()
  declare upVote: number

  @column()
  declare downVote: number

  @column()
  declare voteRatio: number

  @column()
  declare userId: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare markerId: string

  @belongsTo(() => Marker)
  declare marker: BelongsTo<typeof Marker>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static generateUuid(suggestion: Suggestion) {
    suggestion.id = crypto.randomUUID()
  }

  @afterSave()
  @afterDelete()
  static async updateMarkerLabel(suggestion: Suggestion) {
    const marker = await Marker.find(suggestion.markerId)
    if (marker) {
      await marker.updateLabelFromBestSuggestion()
    }
  }
}
