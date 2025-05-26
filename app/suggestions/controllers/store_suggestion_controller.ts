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

      await Post.create({
        userId: user?.id,
        category: 'suggestion',
        content: `Suggestion: ${data.label}`,
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
