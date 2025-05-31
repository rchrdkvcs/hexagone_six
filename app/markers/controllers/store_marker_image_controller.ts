import type { HttpContext } from '@adonisjs/core/http'
import Marker from '#markers/models/marker'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import vine from '@vinejs/vine'

export default class StoreMarkerImageController {
  static validator = vine.compile(
    vine.object({
      markerId: vine.string().uuid(),
      photo: vine.file({
        size: '15mb',
        extnames: ['jpg', 'jpeg', 'png'],
      }),
    })
  )

  async execute({ response, request }: HttpContext) {
    const { markerId, photo: image } = await request.validateUsing(
      StoreMarkerImageController.validator
    )

    const marker = await Marker.findOrFail(markerId)

    const key = `markers/${cuid()}.${image.extname}`
    await image.moveToDisk(key)

    const imageUrl = await drive.use().getUrl(key)

    const uploadedImage = {
      url: imageUrl,
      order: marker.images.length + 1,
    }

    marker.images.push(uploadedImage)

    await marker.save()

    return response.ok({
      message: 'Image uploaded successfully',
      uploadedImage,
    })
  }
}
