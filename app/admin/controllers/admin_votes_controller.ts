import type { HttpContext } from '@adonisjs/core/http'
import Vote from '#votes/models/vote'

export default class AdminVotesController {
  public async render({ inertia }: HttpContext) {
    const votes = await Vote.all()

    return inertia.render('admin/votes', { votes })
  }
}
