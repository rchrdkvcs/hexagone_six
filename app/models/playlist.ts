import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Playlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string
}
