import scheduler from 'adonisjs-scheduler/services/main'
import GenerateSitemap from '../commands/generate_sitemap.js'

scheduler.command(GenerateSitemap).daily()
