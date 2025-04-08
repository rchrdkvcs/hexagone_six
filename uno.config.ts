import { defineConfig, presetIcons, presetWind3, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetIcons(), presetWind3()],
  transformers: [transformerVariantGroup()],
})
