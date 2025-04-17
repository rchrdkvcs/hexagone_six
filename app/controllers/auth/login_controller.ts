import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  public async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  public async execute({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContext) {
    const user = auth.user
    await auth.use('web').logout()

    return response.redirect('/')
  }
}
