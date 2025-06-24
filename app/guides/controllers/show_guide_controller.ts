import type { HttpContext } from '@adonisjs/core/http'
import * as fs from 'node:fs'
import { inject } from '@adonisjs/core'
import app from '@adonisjs/core/services/app'
import { MarkdownCompiler } from '#guides/services/markdown_compiler'

@inject()
export default class ShowGuideController {
  constructor(private markdownCompiler: MarkdownCompiler) {}

  async render({ inertia }: HttpContext) {
    const filePath = app.makePath('app/guides/content/comment-attaquer.md')
    const markdownContent = fs.readFileSync(filePath, 'utf-8')

    const htmlContent = await this.markdownCompiler.toHtml(markdownContent)

    const contents = {
      html: htmlContent.html,
      toc: htmlContent.toc,
    }

    return inertia.render('guide/show', { contents })
  }
}
