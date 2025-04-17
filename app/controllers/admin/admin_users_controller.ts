import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AdminUsersController {
  public async render({ inertia }: HttpContext) {
    const users = await User.all()

    return inertia.render('admin/users', { users })
  }
}
