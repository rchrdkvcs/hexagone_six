import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { SitemapStream } from 'sitemap'
import app from '@adonisjs/core/services/app'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { finished } from 'node:stream'
import Guide from '#guides/models/guide'
import env from '#start/env'
import Map from '#maps/models/map'

export default class GenerateSitemap extends BaseCommand {
  static commandName = 'sitemap:generate'
  static description = 'Generate sitemap'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    try {
      const guides = await Guide.query()
        .whereNotNull('published_at')
        .andWhere('published_at', '<=', new Date())
        .orderBy('published_at', 'desc')

      const cartes = await Map.all()

      const links = [
        // Homepage - highest priority
        {
          url: '/',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 1.0,
        },
        // Main sections - high priority
        {
          url: '/hexaboost',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        },
        {
          url: '/hexacall',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        },
        {
          url: '/pc-clutch',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        },
        {
          url: '/guides',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        },
        {
          url: '/lan',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        },
        // Authentication pages - medium priority
        {
          url: '/register',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.7,
        },
        {
          url: '/login',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.7,
        },
        // Support pages - medium priority
        {
          url: '/aide',
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8,
        },
        // Community - medium priority
        {
          url: '/membres',
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        },
        {
          url: '/haxacall/cartes',
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        },
        // Guides pages - high priority
        ...guides.map((guide) => ({
          url: `/guide/${guide.slug}`,
          lastmod: guide.updatedAt?.toString() ?? guide.createdAt.toString(),
          changefreq: 'weekly',
          priority: 0.8,
        })),
        // Maps pages - high priority
        ...cartes.map((carte) => ({
          url: `/cartes/${carte.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8,
        })),
      ]

      const sitemap = new SitemapStream({ hostname: env.get('APP_URL') })
      const writeStream = createWriteStream(app.publicPath('sitemap.xml'))

      // Pipe the sitemap stream to the write stream
      sitemap.pipe(writeStream)

      // Write all links to the sitemap
      for (const link of links) {
        sitemap.write(link)
      }

      // End the sitemap stream
      sitemap.end()

      // Wait for the write stream to finish
      await promisify(finished)(writeStream)

      this.logger.success('Sitemap generated successfully')
    } catch (error) {
      this.logger.error('Failed to generate sitemap')

      throw error
    }
  }
}
