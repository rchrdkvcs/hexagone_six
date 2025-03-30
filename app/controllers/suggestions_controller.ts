import type { HttpContext } from '@adonisjs/core/http'
import MarkerSuggest from '#models/marker_suggest'
import VoteLog from '#models/vote_log'

export default class SuggestionsController {
  async index({ response, request }: HttpContext) {
    try {
      const { markerId, top, latest } = request.only(['markerId', 'top', 'latest'])

      const suggestions = await MarkerSuggest.query().where('marker_id', markerId)

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

  async store({ response, request }: HttpContext) {
    try {
      const data = request.only(['markerId', 'label'])
      const suggestion = await MarkerSuggest.create({
        ...data,
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

  async update({ response, request, params }: HttpContext) {
    try {
      const data = request.only(['upVote', 'downVote', 'isApproved'])

      const userIp = request.ip()
      const existingVote = await VoteLog.query()
        .where('userIp', userIp)
        .where('markerSuggestId', params.id)
        .first()

      if (existingVote) {
        return response.status(400).json({
          success: false,
          message: 'Vous avez déjà voté pour cette suggestion',
        })
      } else {
        await VoteLog.create({
          userIp,
          voteType: data.upVote ? 'upVote' : 'downVote',
          markerSuggestId: params.id,
        })
      }

      const { id } = params
      const suggestion = await MarkerSuggest.findOrFail(id)
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
      const suggestion = await MarkerSuggest.findOrFail(id)

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
