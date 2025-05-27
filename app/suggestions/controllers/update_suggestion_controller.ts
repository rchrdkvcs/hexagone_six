import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'
import Vote from '#votes/models/vote'
import Post from '#users/models/post'

export default class UpdateSuggestionController {
  async execute({ response, request, params, auth }: HttpContext) {
    try {
      const data = request.only(['upVote', 'downVote', 'isApproved'])
      const userIp = request.ip()
      const suggestionId = params.id

      let existingVote = null
      const suggestion = await Suggestion.findOrFail(suggestionId)
      await suggestion.load('marker')

      const marker = suggestion.marker
      await marker.load('map')
      const map = marker.map

      try {
        existingVote = await Vote.query()
          .where('userIp', userIp)
          .where('suggestionId', suggestionId)
          .first()
      } catch (voteError) {
        console.error('Error checking for existing vote:', voteError.message)
      }

      const userId = auth.user ? auth.user.id : null
      let voteAction = ''

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
          voteAction = 'a changé son vote en négatif pour'
        }

        if (data.upVote && existingVote.voteType === 'downVote') {
          suggestion.upVote += 1
          suggestion.downVote -= 1

          existingVote.voteType = 'upVote'
          await existingVote.save()
          voteAction = 'a changé son vote en positif pour'
        }
      } else {
        await Vote.create({
          userIp,
          userId,
          voteType: data.upVote ? 'upVote' : 'downVote',
          suggestionId,
        })

        if (data.upVote) {
          suggestion.upVote += 1
          voteAction = 'a voté positivement pour'
        }
        if (data.downVote) {
          suggestion.downVote += 1
          voteAction = 'a voté négativement pour'
        }
      }

      if (data.isApproved !== undefined) {
        suggestion.isApproved = data.isApproved
        voteAction = data.isApproved ? 'a approuvé' : 'a rejeté'
      }

      suggestion.voteRatio = suggestion.upVote - suggestion.downVote
      await suggestion.save()

      await suggestion.load('user')

      await Post.create({
        userId: auth.user?.id,
        category: 'votes',
        content: `<span class="font-semibold capitalize">${auth.user?.userName} </span>${voteAction} la suggestion <span class="font-bold">"${suggestion.label}" </span> à la place de <span class="font-bold">"${marker.label}" </span> sur <a class="underline" href="${'/cartes/' + map.slug}">${map.name}</a>`,
      })

      return response.status(200).json(suggestion)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
