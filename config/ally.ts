import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'
import { twitch } from '@rlanz/ally-twitch'

const allyConfig = defineConfig({
  discord: services.discord({
    clientId: env.get('DISCORD_CLIENT_ID'),
    clientSecret: env.get('DISCORD_CLIENT_SECRET'),
    callbackUrl: env.get('DISCORD_CALLBACK_URL'),
  }),
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: env.get('GOOGLE_CALLBACK_URL'),
  }),
  twitch: twitch({
    clientId: env.get('TWITCH_CLIENT_ID'),
    clientSecret: env.get('TWITCH_CLIENT_SECRET'),
    callbackUrl: env.get('TWITCH_CALLBACK_URL'),
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
