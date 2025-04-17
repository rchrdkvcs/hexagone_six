import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class RegistersController {
  public async render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  public async execute({ request, response, auth }: HttpContext) {
    const formData = request.only(['email', 'password', 'userName'])

    const user = await User.create(formData)

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
