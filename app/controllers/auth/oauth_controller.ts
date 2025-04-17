import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class OauthController {
  public async render({ params, ally, session, request }: HttpContext) {
    const { provider } = params
    const returnUrl = request.input('returnUrl', '/')

    session.put('returnUrl', returnUrl)

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

    const user = await User.firstOrCreate(
      {
        email: connectingUser.email,
      },
      {
        userName: connectingUser.nickName,
        provider: provider,
        provider_id: connectingUser.id,
      }
    )

    await auth.use('web').login(user)

    const returnUrl = session.pull('returnUrl', '/')
    return response.redirect(returnUrl)
  }
}
