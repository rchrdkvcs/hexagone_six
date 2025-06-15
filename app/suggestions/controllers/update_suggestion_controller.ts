import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'
import Vote from '#votes/models/vote'
import Post from '#users/models/post'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UpdateSuggestionController {
  constructor(private discordService: DiscordService) {}

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

      if (userId) {
        await Post.create({
          userId: auth.user?.id,
          category: 'votes',
          label: suggestion.label,
          markerName: marker.label,
          mapName: map.name,
          mapSlug: map.slug,
          voteAction,
        })
      }

      await this.discordService
        .createEmbed()
        .setTitle('Mise à jour de suggestion')
        .setDescription(`La suggestion **${suggestion.label}** a été mise à jour.`)
        .addField('User', auth.user ? auth.user.userName : 'Anonyme')
        .addField('Suggestion', suggestion.label)
        .addField('Action', voteAction)
        .addField('Map - Niveau', `${map.name} - ${marker.stage}`)
        .addField('Call actuelle', marker.label)
        .addField('User ID', userId ? userId : userIp)
        .setFooter(`Suggestion ID: ${suggestion.id}`)
        .setColor(DiscordColors.SUCCESS)
        .setTimestamp()
        .send()

      return response.status(200).json(suggestion)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}
