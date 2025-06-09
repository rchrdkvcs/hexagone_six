import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import vine from '@vinejs/vine'

export default class ShowLanGalleryController {
  static validator = vine.compile(vine.object({ year: vine.enum(['2024', '2025']) }))

  async render({ inertia, params }: HttpContext) {
    const { year } = await ShowLanGalleryController.validator.validate(params)

    const imagesUrl = await drive
      .use()
      .listAll(`static/lan/${year}`)
      .then(async (files) => {
        const urls = []

        for (let item of files.objects) {
          if (item.isFile) {
            const url = await item.getUrl()
            urls.push(url)
          }
        }

        return urls
      })

    return inertia.render('lan/gallery/show', { imagesUrl })
  }
}
