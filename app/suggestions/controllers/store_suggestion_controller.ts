import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'

export default class StoreSuggestionController {
  async execute({ response, request, auth }: HttpContext) {
    try {
      const user = auth.user
      const data = request.only(['markerId', 'label'])
      const suggestion = await Suggestion.create({
        ...data,
        userId: user?.id || null,
        isApproved: false,
        upVote: 0,
        downVote: 0,
        voteRatio: 0,
      })

      return response.status(201).json(suggestion)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
