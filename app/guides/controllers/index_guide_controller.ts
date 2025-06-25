import type { HttpContext } from '@adonisjs/core/http'
import Guide from '#guides/models/guide'

export default class IndexGuideController {
  async render({ inertia }: HttpContext) {
<<<<<<< feat/guide -- Incoming Change
    const guides = await Guide.query()
      .whereNotNull('published_at')
      .andWhere('published_at', '<=', new Date())
      .orderBy('published_at', 'desc')
      .limit(4)
=======
    const filePath = app.makePath('public/content/comment-attaquer.md')
    const markdownContent = fs.readFileSync(filePath, 'utf-8')

    const htmlContent = await this.markdownCompiler.toHtml(markdownContent)

    const contents = {
      html: htmlContent.html,
      toc: htmlContent.toc,
    }
>>>>>>> alpha -- Current Change

    return inertia.render('guide/index', { guides })
  }
}
