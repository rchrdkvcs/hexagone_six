import { inject } from '@adonisjs/core'
import env from '#start/env'

export interface DiscordEmbed {
  title?: string
  description?: string
  color?: number
  url?: string
  timestamp?: string
  footer?: {
    text: string
    icon_url?: string
  }
  thumbnail?: {
    url: string
  }
  image?: {
    url: string
  }
  author?: {
    name: string
    url?: string
    icon_url?: string
  }
  fields?: {
    name: string
    value: string
    inline?: boolean
  }[]
}

export interface DiscordMessage {
  content?: string
  username?: string
  avatar_url?: string
  embeds?: DiscordEmbed[]
}

@inject()
export default class DiscordService {
  private defaultWebhookUrl: string

  constructor() {
    this.defaultWebhookUrl = env.get('DISCORD_WEBHOOK_URL')

    if (!this.defaultWebhookUrl) {
      throw new Error('DISCORD_WEBHOOK_URL is not defined in environment variables')
    }
  }

  /**
   * Envoie un message simple
   */
  async sendMessage(content: string, username?: string, webhookUrl?: string): Promise<boolean> {
    return this.sendWebhook(
      {
        content,
        username,
      },
      webhookUrl
    )
  }

  /**
   * Envoie un embed simple
   */
  async sendEmbed(embed: DiscordEmbed, content?: string, webhookUrl?: string): Promise<boolean> {
    return this.sendWebhook(
      {
        content,
        embeds: [embed],
      },
      webhookUrl
    )
  }

  /**
   * Envoie plusieurs embeds
   */
  async sendEmbeds(
    embeds: DiscordEmbed[],
    content?: string,
    webhookUrl?: string
  ): Promise<boolean> {
    return this.sendWebhook(
      {
        content,
        embeds,
      },
      webhookUrl
    )
  }

  /**
   * Envoie un embed de notification d'erreur
   */
  async sendError(error: string, details?: string, webhookUrl?: string): Promise<boolean> {
    const embed: DiscordEmbed = {
      title: '❌ Erreur',
      description: error,
      color: 0xff0000, // Rouge
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Système de notification',
      },
    }

    if (details) {
      embed.fields = [
        {
          name: 'Détails',
          value: details,
          inline: false,
        },
      ]
    }

    return this.sendEmbed(embed, undefined, webhookUrl)
  }

  /**
   * Envoie un embed de succès
   */
  async sendSuccess(message: string, details?: string, webhookUrl?: string): Promise<boolean> {
    const embed: DiscordEmbed = {
      title: '✅ Succès',
      description: message,
      color: 0x00ff00, // Vert
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Système de notification',
      },
    }

    if (details) {
      embed.fields = [
        {
          name: 'Détails',
          value: details,
          inline: false,
        },
      ]
    }

    return this.sendEmbed(embed, undefined, webhookUrl)
  }

  /**
   * Envoie un embed d'information
   */
  async sendInfo(message: string, details?: string, webhookUrl?: string): Promise<boolean> {
    const embed: DiscordEmbed = {
      title: 'ℹ️ Information',
      description: message,
      color: 0x0099ff, // Bleu
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Système de notification',
      },
    }

    if (details) {
      embed.fields = [
        {
          name: 'Détails',
          value: details,
          inline: false,
        },
      ]
    }

    return this.sendEmbed(embed, undefined, webhookUrl)
  }

  /**
   * Méthode privée pour envoyer le webhook
   */
  private async sendWebhook(payload: DiscordMessage, webhookUrl?: string): Promise<boolean> {
    const url = webhookUrl || this.defaultWebhookUrl

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error('Discord webhook error:', response.status, await response.text())
        return false
      }

      return true
    } catch (error) {
      console.error('Failed to send Discord webhook:', error)
      return false
    }
  }

  /**
   * Crée un embed personnalisé avec des helpers
   */
  createEmbed(): EmbedBuilder {
    return new EmbedBuilder(this)
  }

  /**
   * Envoie un message avec le builder d'embed
   */
  async sendEmbedBuilder(
    embedBuilder: EmbedBuilder,
    content?: string,
    webhookUrl?: string
  ): Promise<boolean> {
    return this.sendEmbed(embedBuilder.build(), content, webhookUrl)
  }

  /**
   * Obtient l'URL du webhook par défaut
   */
  getDefaultWebhookUrl(): string {
    return this.defaultWebhookUrl
  }
}

/**
 * Helper pour construire des embeds facilement
 */
export class EmbedBuilder {
  private embed: DiscordEmbed = {}
  private discordService?: DiscordService

  constructor(discordService?: DiscordService) {
    this.discordService = discordService
  }

  setTitle(title: string): this {
    this.embed.title = title
    return this
  }

  setDescription(description: string): this {
    this.embed.description = description
    return this
  }

  setColor(color: number): this {
    this.embed.color = color
    return this
  }

  setUrl(url: string): this {
    this.embed.url = url
    return this
  }

  setTimestamp(timestamp?: Date): this {
    this.embed.timestamp = (timestamp || new Date()).toISOString()
    return this
  }

  setFooter(text: string, iconUrl?: string): this {
    this.embed.footer = { text, icon_url: iconUrl }
    return this
  }

  setThumbnail(url: string): this {
    this.embed.thumbnail = { url }
    return this
  }

  setImage(url: string): this {
    this.embed.image = { url }
    return this
  }

  setAuthor(name: string, url?: string, iconUrl?: string): this {
    this.embed.author = { name, url, icon_url: iconUrl }
    return this
  }

  addField(name: string, value: string, inline: boolean = false): this {
    if (!this.embed.fields) {
      this.embed.fields = []
    }
    this.embed.fields.push({ name, value, inline })
    return this
  }

  build(): DiscordEmbed {
    return this.embed
  }

  /**
   * Envoie directement l'embed avec le service Discord (si disponible)
   */
  async send(content?: string, webhookUrl?: string): Promise<boolean> {
    if (!this.discordService) {
      throw new Error('DiscordService not available. Use build() method instead.')
    }
    return this.discordService.sendEmbed(this.build(), content, webhookUrl)
  }
}

// Couleurs prédéfinies
export const DiscordColors = {
  PRIMARY: 0x5865f2,
  SUCCESS: 0x57f287,
  WARNING: 0xfee75c,
  DANGER: 0xed4245,
  INFO: 0x5865f2,
  SECONDARY: 0x747f8d,
  DARK: 0x23272a,
  LIGHT: 0xf8f9fa,
} as const
