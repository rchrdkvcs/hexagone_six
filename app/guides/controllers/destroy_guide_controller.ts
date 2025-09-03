import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Guide from '#guides/models/guide'
import vine from '@vinejs/vine'

@inject()
export default class DestroyGuideController {
  static validator = vine.compile(
    vine.object({
      id: vine.string().uuid(),
    })
  )
  async execute({ params, response }: HttpContext) {
    const data = await DestroyGuideController.validator.validate(params)

    const guide = await Guide.findOrFail(data.id)

    await guide.delete()

    return response.redirect().back()
  }
}
