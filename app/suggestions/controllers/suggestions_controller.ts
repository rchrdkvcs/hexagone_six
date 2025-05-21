import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'
import Vote from '#votes/models/vote'

export default class SuggestionsController {
  async index({ response, request }: HttpContext) {
    try {
      const { markerId, top, latest } = request.only(['markerId', 'top', 'latest'])

      const suggestions = await Suggestion.query().where('markerId', markerId).preload('user')

      if (top) {
        const topCount = Number.parseInt(top) || 3
        const sortedSuggestions = suggestions.sort((a, b) => {
          return b.voteRatio - a.voteRatio
        })

        return response.status(200).json(sortedSuggestions.slice(0, topCount))
      } else if (latest) {
        const latestCount = Number.parseInt(latest) || 10
        const sortedSuggestions = suggestions.sort((a, b) => {
          return b.createdAt.toMillis() - a.createdAt.toMillis()
        })

        return response.status(200).json(sortedSuggestions.slice(0, latestCount))
      }

      return response.status(200).json(suggestions)
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      })
    }
  }

  async store({ response, request, auth }: HttpContext) {
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

  async update({ response, request, params, auth }: HttpContext) {
    try {
      const data = request.only(['upVote', 'downVote', 'isApproved'])
      const userIp = request.ip()
      const suggestionId = params.id

      let existingVote = null

      try {
        existingVote = await Vote.query()
          .where('userIp', userIp)
          .where('suggestionId', suggestionId)
          .first()
      } catch (voteError) {
        console.error('Error checking for existing vote:', voteError.message)
      }

      if (existingVote) {
        return response.status(400).json({
          success: false,
          message: 'Vous avez déjà voté pour cette suggestion.',
        })
      }

      const userId = auth.user ? auth.user.id : null

      await Vote.create({
        userIp,
        userId,
        voteType: data.upVote ? 'upVote' : 'downVote',
        suggestionId,
      })

      const suggestion = await Suggestion.findOrFail(suggestionId)
      suggestion.merge(data)

      if (data.upVote !== undefined || data.downVote !== undefined) {
        suggestion.voteRatio = suggestion.upVote - suggestion.downVote
      }

      await suggestion.save()

      return response.status(200).json(suggestion)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const { id } = params
      const suggestion = await Suggestion.findOrFail(id)

      await suggestion.delete()

      return response.status(200).json({
        success: true,
        message: 'Suggestion deleted successfully',
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
