import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import vine from '@vinejs/vine'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'

@inject()
export default class StoreMarkerImageController {
  constructor(private discordService: DiscordService) {}

  static validator = vine.compile(
    vine.object({
      markerId: vine.string().uuid(),
      photo: vine.file({
        size: '15mb',
        extnames: ['jpg', 'jpeg', 'png'],
      }),
    })
  )

  async execute({ response, request, auth }: HttpContext) {
    const user = await auth.authenticate()

    const { markerId, photo: image } = await request.validateUsing(
      StoreMarkerImageController.validator
    )

    const marker = await Marker.findOrFail(markerId)
    marker.load('map')

    const key = `markers/${cuid()}.${image.extname}`
    await image.moveToDisk(key)

    const imageUrl = await drive.use().getUrl(key)

    const uploadedImage = {
      url: imageUrl,
      order: marker.images.length + 1,
    }

    marker.images.push(uploadedImage)

    await marker.save()

    await this.discordService
      .createEmbed()
      .setTitle('Nouvelle image de call')
      .setDescription(`Une nouvelle image a été ajoutée au call **${marker.label}**`)
      .addField('Map - Niveau', marker.map.name + ' - ' + marker.stage)
      .addField('Call', marker.label)
      .addField('Call ID', marker.id)
      .addField('Téléchargée par', user.userName)
      .addField('User ID', user.id)
      .addField('Image URL', `[Voir l'image](http://localhost:3333${imageUrl})`)
      .setColor(DiscordColors.SUCCESS)
      .setTimestamp()
      .send()

    return response.ok({
      message: 'Image uploaded successfully',
      uploadedImage,
    })
  }
}
