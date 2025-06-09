import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()

    if (
      user.roles.includes('admin') ||
      user.roles.includes('editor') ||
      user.roles.includes('developer')
    ) {
      return await next()
    }

    ctx.response.redirect('/403')
  }
}
