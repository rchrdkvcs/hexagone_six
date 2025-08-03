import { inject } from '@adonisjs/core'
import Guide from '#guides/models/guide'
import Purchase from '#guides/models/purchase'
import User from '#users/models/user'

export interface GuideAccess {
  hasAccess: boolean
  isFree: boolean
  isPaid: boolean
  contentToShow: string
  tocToShow: string
  truncated: boolean
  guide: Guide
}

@inject()
export default class GuideAccessService {
  /**
   * Vérifier l'accès d'un utilisateur à un guide
   */
  async checkAccess(guide: Guide, user?: User, forceRefresh = false): Promise<GuideAccess> {
    const isFree = guide.price === 0 || guide.price === null || guide.price <= 0

    // Si le guide est gratuit, accès total
    if (isFree) {
      return {
        hasAccess: true,
        isFree: true,
        isPaid: false,
        contentToShow: guide.htmlContent,
        tocToShow: guide.toc,
        truncated: false,
        guide,
      }
    }

    // Si l'utilisateur n'est pas connecté, accès limité
    if (!user) {
      return this.createLimitedAccess(guide)
    }

    // Vérifier si l'utilisateur a acheté le guide
    const hasPurchased = await this.hasUserPurchasedGuide(user, guide, forceRefresh)

    if (hasPurchased) {
      return {
        hasAccess: true,
        isFree: false,
        isPaid: true,
        contentToShow: guide.htmlContent,
        tocToShow: guide.toc,
        truncated: false,
        guide,
      }
    }

    // Accès limité pour les guides payants non achetés
    return this.createLimitedAccess(guide)
  }

  /**
   * Vérifier si un utilisateur a acheté un guide
   */
  private async hasUserPurchasedGuide(
    user: User,
    guide: Guide,
    forceRefresh = false
  ): Promise<boolean> {
    let query = Purchase.query()
      .where('user_id', user.id)
      .where('product_id', guide.id)
      .where('product_type', 'guide')

    // Si on force le refresh, on ordonne par date de création pour avoir le plus récent
    if (forceRefresh) {
      query = query.orderBy('created_at', 'desc')

      // Attendre un peu pour s'assurer que la transaction est bien commitée
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const purchase = await query.first()

    return !!purchase
  }

  /**
   * Créer un accès limité avec contenu tronqué
   */
  private createLimitedAccess(guide: Guide): GuideAccess {
    // Tronquer le contenu HTML (garder environ 10% du début)
    const truncatedContent = this.truncateHtmlContent(guide.htmlContent, 0.05)

    // Tronquer la table des matières (garder seulement les premiers éléments)
    const truncatedToc = this.truncateToc(guide.toc, 3)

    return {
      hasAccess: false,
      isFree: false,
      isPaid: true,
      contentToShow: truncatedContent,
      tocToShow: truncatedToc,
      truncated: true,
      guide,
    }
  }

  /**
   * Tronquer le contenu HTML en gardant une partie du début
   */
  private truncateHtmlContent(htmlContent: string, percentage: number): string {
    if (!htmlContent) return ''

    // Compter les caractères et tronquer à la position appropriée
    const targetLength = Math.floor(htmlContent.length * percentage)

    // Trouver une position de coupe appropriée (après une balise fermante)
    let cutPosition = targetLength
    const closingTagRegex = /<\/[^>]+>/g
    let match
    let lastTagEnd = 0

    while ((match = closingTagRegex.exec(htmlContent)) !== null) {
      if (match.index > targetLength) break
      lastTagEnd = match.index + match[0].length
    }

    // Si on a trouvé une balise fermante avant la position cible, utiliser ça
    if (lastTagEnd > 0 && lastTagEnd < targetLength + 200) {
      cutPosition = lastTagEnd
    }

    let truncated = htmlContent.substring(0, cutPosition)

    // S'assurer que les balises ouvertes sont fermées
    const openTags = []
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g
    let tagMatch

    while ((tagMatch = tagRegex.exec(truncated)) !== null) {
      const tagName = tagMatch[1].toLowerCase()
      if (tagMatch[0].startsWith('</')) {
        // Balise fermante
        const index = openTags.lastIndexOf(tagName)
        if (index !== -1) {
          openTags.splice(index, 1)
        }
      } else if (!tagMatch[0].endsWith('/>')) {
        // Balise ouvrante (pas auto-fermante)
        if (!['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) {
          openTags.push(tagName)
        }
      }
    }

    // Fermer les balises ouvertes
    for (let i = openTags.length - 1; i >= 0; i--) {
      truncated += `</${openTags[i]}>`
    }

    return truncated
  }

  /**
   * Tronquer la table des matières
   */
  private truncateToc(toc: string, maxItems: number): string {
    if (!toc) return ''

    try {
      const tocData = JSON.parse(toc)

      if (Array.isArray(tocData) && tocData.length > maxItems) {
        const truncatedToc = tocData.slice(0, maxItems)

        // Ajouter un indicateur qu'il y a plus de contenu
        truncatedToc.push({
          level: 2,
          title: '🔒 Et bien plus encore...',
          anchor: 'premium-content',
          disabled: true,
        })

        return JSON.stringify(truncatedToc)
      }

      return toc
    } catch {
      // Si le parsing échoue, retourner la TOC originale
      return toc
    }
  }

  /**
   * Obtenir les statistiques d'un guide pour l'affichage
   */
  async getGuideStats(guide: Guide): Promise<{
    totalPurchases: number
    revenue: number
  }> {
    const purchases = await Purchase.query()
      .where('product_id', guide.id)
      .where('product_type', 'guide')

    return {
      totalPurchases: purchases.length,
      revenue: purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0),
    }
  }

  /**
   * Obtenir la liste des guides achetés par un utilisateur
   */
  async getUserPurchasedGuides(user: User): Promise<Guide[]> {
    const purchases = await Purchase.query()
      .where('user_id', user.id)
      .where('product_type', 'guide')
      .preload('user')

    const guideIds = purchases
      .map((purchase) => purchase.productId)
      .filter((id): id is string => Boolean(id))

    if (guideIds.length === 0) {
      return []
    }

    return Guide.query().whereIn('id', guideIds)
  }
}
