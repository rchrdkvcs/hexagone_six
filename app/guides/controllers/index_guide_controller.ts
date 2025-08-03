import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Guide from '#guides/models/guide'
import GuideAccessService from '#guides/services/guide_access_service'

@inject()
export default class IndexGuideController {
  constructor(private guideAccessService: GuideAccessService) {}

  async render({ inertia, auth }: HttpContext) {
    const guides = await Guide.query()
      .whereNotNull('published_at')
      .andWhere('published_at', '<=', new Date())
      .orderBy('published_at', 'desc')

    // Obtenir l'utilisateur connecté (peut être null)
    const user = auth.user

    // Récupérer les guides achetés par l'utilisateur si connecté
    const purchasedGuideIds: string[] = []
    if (user) {
      const purchasedGuides = await this.guideAccessService.getUserPurchasedGuides(user)
      purchasedGuideIds.push(...purchasedGuides.map(guide => guide.id))
    }

    return inertia.render('guide/index', { 
      guides: guides.map(guide => ({
        ...guide.serialize(),
        isPurchased: purchasedGuideIds.includes(guide.id)
      })),
      user: user ? user.serialize() : null
    })
  }
}
