import type { HttpContext } from '@adonisjs/core/http'
import Suggestion from '#suggestions/models/suggestion'
import Post from '#users/models/post'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'
import transmit from '@adonisjs/transmit/services/main'

@inject()
export default class StoreSuggestionController {
  constructor(private discordService: DiscordService) {}

  async execute({ response, request, auth }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const data = request.only(['markerId', 'label'])

      const suggestion = await Suggestion.create({
        ...data,
        userId: user.id || null,
        isApproved: false,
        upVote: 0,
        downVote: 0,
        voteRatio: 0,
      })

      const marker = await suggestion.related('marker').query().firstOrFail()
      const map = await marker.related('map').query().firstOrFail()

      const backgroundTasks = [
        await Post.create({
          userId: user.id,
          category: 'suggestion',
          label: data.label,
          markerName: marker.label,
          mapName: map.name,
          mapSlug: map.slug,
        }),
        await this.discordService
          .createEmbed()
          .setTitle('Nouvelle suggestion')
          .setDescription(`Une nouvelle suggestion a été créée par **${user.userName}**.`)
          .addField('Suggestion', data.label)
          .addField('Call', marker.label)
          .addField('Map - Niveau', map.name + ' - ' + marker.stage)
          .addField('User ID', user.id)
          .setFooter(`Suggestion ID: ${suggestion.id}`)
          .setColor(DiscordColors.SUCCESS)
          .setTimestamp()
          .send()
      ]

      Promise.allSettled(backgroundTasks).catch(() => {
        // Background tasks failed silently
      })

      await suggestion.load('user')

      transmit.broadcast(`markers:${data.markerId}:suggestions:create`, {
        suggestion: {
          ...suggestion.serialize(),
          user: suggestion.user?.serialize()
        }
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
