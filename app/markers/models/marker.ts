import {
  afterCreate,
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import MarkerSuggest from '#suggestions/models/suggestion'
import Map from '#maps/models/map'
import User from '#users/models/user'
import Suggestion from '#suggestions/models/suggestion'
import Vote from '#votes/models/vote'

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
  declare type: 'point' | 'polygone'

  @column({ prepare: (value) => JSON.stringify(value) })
  declare coordinates: Coordinates[]

  @column()
  declare label: string

  @column()
  declare stage: number

  @column({ prepare: (value) => JSON.stringify(value) })
  declare images: MarkerImage[]

  @column()
  declare userId: string

  @column()
  declare userIp: string

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

  @afterCreate()
  static async createInitialSuggestion(marker: Marker) {
    const suggestion = await Suggestion.create({
      label: marker.label,
      isApproved: false,
      upVote: 1,
      downVote: 0,
      voteRatio: 1,
      userId: marker.userId,
      markerId: marker.id,
    })

    await Vote.create({
      userId: marker.userId,
      userIp: marker.userIp,
      voteType: 'upVote',
      suggestionId: suggestion.id,
    })
  }

  async updateLabelFromBestSuggestion() {
    const topSuggestion = await Suggestion.query()
      .where('marker_id', this.id)
      .orderBy('vote_ratio', 'desc')
      .first()

    if (topSuggestion && topSuggestion.label !== this.label) {
      this.label = topSuggestion.label
      await this.save()
    }
  }
}
