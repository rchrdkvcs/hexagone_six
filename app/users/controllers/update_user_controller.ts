import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'

export default class UpdateUserController {
  static validator = vine.compile(
    vine.object({
      userName: vine
        .string()
        .minLength(4)
        .maxLength(16)
        .toLowerCase()
        .regex(/^[a-z0-9_-]+$/)
        .unique(async (db, value, field) => {
          const userId = field.data.params.id

          return await db
            .from('users')
            .where('user_name', value)
            .whereNot('id', userId)
            .first()
            .then((user) => {
              return !user
            })
        }),
      bio: vine.string().maxLength(500),
    })
  )

  async execute({ request, response, params }: HttpContext) {
    const { userName, bio } = await request.validateUsing(UpdateUserController.validator)

    const user = await User.findOrFail(params.id)

    user.merge({
      userName,
      bio,
    })

    await user.save()

    return response.redirect('/membres/' + user.userName)
  }
}
