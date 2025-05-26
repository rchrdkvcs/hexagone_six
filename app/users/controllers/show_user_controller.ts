import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'

export default class ShowUserController {
  async render({ inertia, params }: HttpContext) {
    const { userName } = params

    const user = await User.query()
      .where('userName', userName)
      .preload('suggestions')
      .preload('posts')
      .firstOrFail()

    return inertia.render('users/show', { user })
  }
}
