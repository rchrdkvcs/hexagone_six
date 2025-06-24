import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { MarkdownCompiler } from '#guides/services/markdown_compiler'
import vine from '@vinejs/vine'
import Guide from '#guides/models/guide'
import string from '@adonisjs/core/helpers/string'

@inject()
export default class CreateGuideController {
  constructor(private markdownCompiler: MarkdownCompiler) {}

  static validator = vine.compile(
    vine.object({
      title: vine.string(),
      summary: vine.string(),
      markdownContent: vine.string(),
    })
  )

  async execute({ response, request }: HttpContext) {
    const data = await request.validateUsing(CreateGuideController.validator)

    const htmlContent = await this.markdownCompiler.toHtml(data.markdownContent)

    await Guide.create({
      ...data,
      slug: string.slug(data.title).toLowerCase(),
      htmlContent: htmlContent.html,
      toc: htmlContent.toc,
    })

    return response.redirect().back()
  }
}
