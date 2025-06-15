import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'

@inject()
export default class LoginController {
  constructor(private discordService: DiscordService) {}

  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  public async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  public async execute({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(email, password)

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

    return response.redirect().back()
  }
}
