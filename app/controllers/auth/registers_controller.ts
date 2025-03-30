import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class RegistersController {
  public async render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  public async execute({ request, response }: HttpContext) {
    const formData = request.only(['userName', 'password'])

    const user = await User.create(formData)

    response.status(201).json(user)
  }
}
