import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import { inject } from '@adonisjs/core'
import drive from '@adonisjs/drive/services/main'
import vine from '@vinejs/vine'

@inject()
export default class StoreGuideImageController {
  static validator = vine.compile(
    vine.object({
      image: vine.file({
        size: '15mb',
        extnames: ['jpg', 'jpeg', 'png'],
      }),
    })
  )

  async execute({ response, request }: HttpContext) {
    const data = await request.validateUsing(StoreGuideImageController.validator)

    const key = `guides/${cuid()}.${data.image.extname}`
    await data.image.moveToDisk(key)

    const imageUrl = await drive.use().getUrl(key)

    return response.ok({
      message: 'Image uploaded successfully',
      data: {
        filePath: imageUrl,
      },
    })
  }
}
