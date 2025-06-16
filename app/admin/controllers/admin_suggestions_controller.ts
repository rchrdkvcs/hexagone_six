import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'

export default class AdminSuggestionsController {
  public async render({ inertia }: HttpContext) {
    const suggestions = await Suggestion.query()
      .preload('user')
      .preload('marker', (query) => {
        query.preload('map')
      })

    return inertia.render('admin/suggestions', { suggestions })
  }
}
