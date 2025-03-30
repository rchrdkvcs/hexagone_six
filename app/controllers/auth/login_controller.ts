import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  public async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  public async execute({ request, response, auth }: HttpContext) {
    const { userName, password } = request.only(['userName', 'password'])

    const user = await User.verifyCredentials(userName, password)

    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' })
    }

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
