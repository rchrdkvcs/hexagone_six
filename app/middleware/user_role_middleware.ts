import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()
    await user.load('role')
    const userAccess = user.role.access

    if (userAccess !== null && userAccess !== undefined && userAccess > 1) {
      return await next()
    }

    ctx.response.redirect('/403')
  }
}
