import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'

export default class ShowUserController {
  static validator = vine.compile(
    vine.object({
      userSlug: vine.string(),
    })
  )

  async render({ inertia, params }: HttpContext) {
    const { userSlug } = await ShowUserController.validator.validate(params)

    const userProfile = await User.query()
      .where('userSlug', userSlug)
      .preload('posts', (query) => {
        query.orderBy('createdAt', 'desc')
      })
      .firstOrFail()

    return inertia.render('users/show', { userProfile })
  }
}
