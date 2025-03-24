import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Marker extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare x: number

  @column()
  declare y: number

  @column()
  declare stage: number
}
