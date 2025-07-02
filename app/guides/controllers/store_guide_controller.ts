import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { MarkdownCompiler } from '#guides/services/markdown_compiler'
import vine from '@vinejs/vine'
import Guide from '#guides/models/guide'
import string from '@adonisjs/core/helpers/string'
import { DateTime } from 'luxon'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class StoreGuideController {
  constructor(private markdownCompiler: MarkdownCompiler) {}

  static validator = vine.compile(
    vine.object({
      author: vine.string(),
      title: vine.string(),
      summary: vine.string(),
      price: vine.number(),
      markdownContent: vine.string(),
      publishedAt: vine.date().optional(),
      thumbnail: vine.file({
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      }),
    })
  )

  async execute({ response, request }: HttpContext) {
    const data = await request.validateUsing(StoreGuideController.validator)

    const htmlContent = await this.markdownCompiler.toHtml(data.markdownContent)

    const thumbnailKey = `guides/${cuid()}.${data.thumbnail.extname}`
    await data.thumbnail.moveToDisk(thumbnailKey)
    const thumbnailUrl = await drive.use().getUrl(thumbnailKey)

    await Guide.create({
      author: data.author,
      title: data.title,
      summary: data.summary,
      price: data.price,
      markdownContent: data.markdownContent,
      slug: string.slug(data.title).toLowerCase(),
      htmlContent: htmlContent.html,
      toc: htmlContent.toc,
      publishedAt: data.publishedAt ? DateTime.fromJSDate(data.publishedAt) : undefined,
      thumbnailUrl: thumbnailUrl,
    })

    return response.redirect('/p/guides')
  }
}
