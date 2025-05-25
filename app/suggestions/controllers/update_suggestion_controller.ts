import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'
import Vote from '#votes/models/vote'

export default class UpdateSuggestionController {
  async execute({ response, request, params, auth }: HttpContext) {
    try {
      const data = request.only(['upVote', 'downVote', 'isApproved'])
      const userIp = request.ip()
      const suggestionId = params.id

      let existingVote = null
      const suggestion = await Suggestion.findOrFail(suggestionId)

      try {
        existingVote = await Vote.query()
          .where('userIp', userIp)
          .where('suggestionId', suggestionId)
          .first()
      } catch (voteError) {
        console.error('Error checking for existing vote:', voteError.message)
      }

      const userId = auth.user ? auth.user.id : null

      if (existingVote) {
        if (
          (data.upVote && existingVote.voteType === 'upVote') ||
          (data.downVote && existingVote.voteType === 'downVote')
        ) {
          return response.status(400).json({
            success: false,
            message: `Vous avez déjà ${existingVote.voteType === 'upVote' ? 'UpVote' : 'DownVote'} pour cette suggestion.`,
          })
        }

        if (data.downVote && existingVote.voteType === 'upVote') {
          suggestion.upVote -= 1
          suggestion.downVote += 1

          existingVote.voteType = 'downVote'
          await existingVote.save()
        }

        if (data.upVote && existingVote.voteType === 'downVote') {
          suggestion.upVote += 1
          suggestion.downVote -= 1

          existingVote.voteType = 'upVote'
          await existingVote.save()
        }
      } else {
        await Vote.create({
          userIp,
          userId,
          voteType: data.upVote ? 'upVote' : 'downVote',
          suggestionId,
        })

        if (data.upVote) suggestion.upVote += 1
        if (data.downVote) suggestion.downVote += 1
      }

      if (data.isApproved !== undefined) {
        suggestion.isApproved = data.isApproved
      }

      suggestion.voteRatio = suggestion.upVote - suggestion.downVote
      await suggestion.save()

      // Load the user relationship before returning the suggestion
      await suggestion.load('user')

      return response.status(200).json(suggestion)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
