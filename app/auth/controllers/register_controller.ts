import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'

export default class RegistersController {
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

    const { passwordConfirmation, ...userData } = data

    const user = await User.create(userData)

    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
