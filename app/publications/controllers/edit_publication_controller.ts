import type { HttpContext } from '@adonisjs/core/http'
import Guide from '#guides/models/guide'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export default class EditPublicationController {
  static paramsValidator = vine.compile(
    vine.object({
      id: vine.string().uuid(),
    })
  )

  static bodyValidator = vine.compile(
    vine.object({
      title: vine.string().optional(),
      summary: vine.string().optional(),
      price: vine.number().optional(),
      markdownContent: vine.string().optional(),
      publishedAt: vine.date().optional(),
    })
  )

  async render({ inertia, params }: HttpContext) {
    const data = await EditPublicationController.paramsValidator.validate(params)
    const guide = await Guide.findOrFail(data.id)

    return inertia.render('guide/publication/edit', { guide })
  }

  async execute({ params, request, response }: HttpContext) {
    const paramsData = await EditPublicationController.paramsValidator.validate(params)
    const bodyData = await request.validateUsing(EditPublicationController.bodyValidator)

    const guide = await Guide.findOrFail(paramsData.id)

    const updateData: any = {}

    if (bodyData.title !== undefined) updateData.title = bodyData.title
    if (bodyData.summary !== undefined) updateData.summary = bodyData.summary
    if (bodyData.price !== undefined) updateData.price = bodyData.price
    if (bodyData.markdownContent !== undefined)
      updateData.markdownContent = bodyData.markdownContent
    if (bodyData.publishedAt !== undefined) {
      updateData.publishedAt = bodyData.publishedAt
        ? DateTime.fromJSDate(bodyData.publishedAt)
        : null
    }

    guide.merge(updateData)
    await guide.save()

    return response.redirect('/p/guides')
  }
}
