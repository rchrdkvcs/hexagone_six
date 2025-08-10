import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'
import vine from '@vinejs/vine'
import Post from '#users/models/post'
import Map from '#maps/models/map'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'

@inject()
export default class StoreMarkerController {
  constructor(private discordService: DiscordService) {}

  static validator = vine.compile(
    vine.object({
      mapId: vine.string().uuid(),
      userId: vine.string().uuid(),
      label: vine.string().minLength(3).maxLength(30),
      type: vine.enum(['point', 'polygone']),
      stage: vine.number(),
      coordinates: vine.array(
        vine.object({
          x: vine.number(),
          y: vine.number(),
        })
      ),
    })
  )

  async execute({ response, request, auth }: HttpContext) {
    const user = await auth.authenticate()

    try {
      const data = await request.validateUsing(StoreMarkerController.validator)
      const { id } = await Marker.create({
        ...data,
        userIp: request.ip(),
      })

      const marker = await Marker.findOrFail(id)

      await marker.load('user')
      await marker.load('suggestions', (query) => {
        query.preload('user', (userQuery) => {
          userQuery.preload('votes')
        })
      })

      const map = await Map.findOrFail(data.mapId)

      const backgroundTasks = [
        await Post.create({
          userId: user.id,
          category: 'proposition',
          label: data.label,
          markerName: marker.label,
          mapName: map.name,
          mapSlug: map.slug,
        }),
        await this.discordService
          .createEmbed()
          .setTitle('Nouveau marqueur ajouté')
          .setDescription(`Un nouveau marqueur a été ajouté par **${user.userName}**`)
          .addField('Label', data.label)
          .addField('Map - Niveau', map.name + ' - ' + data.stage.toString())
          .addField('Type', data.type)
          .addField('User ID', user.id)
          .setFooter(`ID: ${marker.id}`)
          .setColor(DiscordColors.SUCCESS)
          .setTimestamp()
          .send(),
      ]

      Promise.allSettled(backgroundTasks).catch((error) => {
        console.error('Background tasks failed:', error)
      })

      return response.status(201).json({
        success: true,
        marker,
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
