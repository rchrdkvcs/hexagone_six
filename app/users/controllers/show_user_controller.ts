import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'

export default class ShowUserController {
  async render({ inertia, params }: HttpContext) {
    const { userName } = params

    const user = await User.findByOrFail('userName', userName)

    return inertia.render('users/show', { user })
  }
}
