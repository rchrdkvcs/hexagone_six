import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'

@inject()
export default class OauthController {
  constructor(private discordService: DiscordService) {}

  public async render({ params, ally, session, request }: HttpContext) {
    const { provider } = params

    session.put('returnUrl', request.header('referer') || '/')

    return ally.use(provider).redirect()
  }

  public async execute({ params, ally, auth, response, session }: HttpContext) {
    const { provider } = params
    const social = ally.use(provider)

    if (social.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (social.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    if (social.hasError()) {
      return social.getError()
    }

    const connectingUser = await social.user()

    const slugifiedUserName = () => {
      return connectingUser.nickName.toLowerCase().replace(/\s+/g, '-')
    }

    const user = await User.firstOrCreate(
      {
        email: connectingUser.email,
        provider: provider,
      },
      {
        userName: connectingUser.nickName.toLowerCase(),
        userSlug: slugifiedUserName(),
        provider: provider,
        provider_id: connectingUser.id,
        avatarUrl: connectingUser.avatarUrl,
      }
    )

    await auth.use('web').login(user)

    await this.discordService
      .createEmbed()
      .setThumbnail(user.avatarUrl)
      .setTitle('Nouvelle connexion')
      .setDescription(`Un utilisateur s'est connecté à son compte.`)
      .addField('Provider', user.provider)
      .addField('Username', user.userName)
      .addField('Email', user.email)
      .addField('ID', user.id)
      .setFooter('User Login Notification')
      .setColor(DiscordColors.SUCCESS)
      .setTimestamp()
      .send(undefined)

    const returnUrl = session.get('returnUrl', '/')
    session.forget('returnUrl')

    return response.redirect(returnUrl)
  }
}
