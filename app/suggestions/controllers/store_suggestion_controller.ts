import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'
import Post from '#users/models/post'

export default class StoreSuggestionController {
  async execute({ response, request, auth }: HttpContext) {
    try {
      const data = request.only(['markerId', 'label'])
      const user = auth.user

      const suggestion = await Suggestion.create({
        ...data,
        userId: user?.id || null,
        isApproved: false,
        upVote: 0,
        downVote: 0,
        voteRatio: 0,
      })

      const marker = await suggestion.related('marker').query().firstOrFail()
      const map = await marker.related('map').query().firstOrFail()

      await Post.create({
        userId: user?.id,
        category: 'suggestion',
        label: data.label,
        markerName: marker.label,
        mapName: map.name,
        mapSlug: map.slug,
      })

      await suggestion.load('user')

      return response.status(201).json(suggestion)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
