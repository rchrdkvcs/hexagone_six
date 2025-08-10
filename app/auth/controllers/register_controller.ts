import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'
import DiscordService, { DiscordColors } from '#core/services/discord_service'
import { inject } from '@adonisjs/core'

@inject()
export default class RegistersController {
  constructor(private discordService: DiscordService) {}

  static validator = vine.compile(
    vine.object({
      userName: vine.string().minLength(3).maxLength(30),
      email: vine.string().email(),
      password: vine.string().minLength(8),
      passwordConfirmation: vine.string().confirmed({ confirmationField: 'password' }),
    })
  )

  public async render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  public async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(RegistersController.validator)

    const slugifiedUserName = () => {
      return data.userName.toLowerCase().replace(/\s+/g, '-')
    }

    const { passwordConfirmation, ...userData } = data

    const user = await User.create({
      ...userData,
      userSlug: slugifiedUserName(),
    })

    await auth.use('web').login(user)

    const backgroundTasks = [
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
    ]

    Promise.allSettled(backgroundTasks).catch((error) => {
      console.error('Background tasks failed:', error)
    })

    return response.redirect().toPath('/')
  }
}
