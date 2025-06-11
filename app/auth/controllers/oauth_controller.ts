import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'

export default class OauthController {
  public async render({ params, ally }: HttpContext) {
    const { provider } = params

    return ally.use(provider).redirect()
  }

  public async execute({ params, ally, auth, response }: HttpContext) {
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
      return userName.toLowerCase().replace(/\s+/g, '-')
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

    return response.redirect().back()
  }
}
