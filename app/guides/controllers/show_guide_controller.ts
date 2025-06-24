import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { MarkdownCompiler } from '#guides/services/markdown_compiler'
import Guide from '#guides/models/guide'

@inject()
export default class ShowGuideController {
  constructor(private markdownCompiler: MarkdownCompiler) {}

  async render({ inertia, params }: HttpContext) {
    const slug = params.slug

    const guide = await Guide.findByOrFail('slug', slug)

    return inertia.render('guide/show', { guide })
  }
}
