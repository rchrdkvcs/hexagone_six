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
        content: `<span class="font-semibold capitalize">${user?.userName} </span>a suggéré un nouveau call <span class="font-bold">"${data.label}" </span> a la place de <span class="font-bold">"${marker.label}" </span> sur <a class="underline" href="${`/cartes/` + map.slug}">${map.name}</a>`,
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
