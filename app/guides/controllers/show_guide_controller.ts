import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Guide from '#guides/models/guide'
import GuideAccessService from '#guides/services/guide_access_service'

@inject()
export default class ShowGuideController {
  constructor(private guideAccessService: GuideAccessService) {}

  async render({ inertia, params, auth, request }: HttpContext) {
    const slug = params.slug

    const guide = await Guide.findByOrFail('slug', slug)

    // Obtenir l'utilisateur connecté (peut être null)
    const user = auth.user

    // Vérifier si l'utilisateur vient d'acheter le guide
    const justPurchased = request.input('purchased') === 'true'

    // Vérifier l'accès au guide (forcer le refresh si justPurchased)
    const access = await this.guideAccessService.checkAccess(guide, user, justPurchased)

    return inertia.render('guide/show', {
      guide: {
        ...guide.serialize(),
        // Remplacer le contenu par le contenu autorisé
        htmlContent: access.contentToShow,
        toc: access.tocToShow,
      },
      access: {
        hasAccess: access.hasAccess,
        isFree: access.isFree,
        isPaid: access.isPaid,
        truncated: access.truncated,
        price: guide.price, // Prix en euros
        priceFormatted: guide.price
          ? guide.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
          : null,
        contentToShow: access.contentToShow,
      },
      user: user ? user.serialize() : null,
      justPurchased,
    })
  }
}
