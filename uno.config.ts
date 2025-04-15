import { defineConfig, presetIcons, presetWind4, transformerVariantGroup } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        50: '#EAEAEB',
        100: '#D5D6D7',
        200: '#AAADAF',
        300: '#808388',
        400: '#565A60',
        500: '#3D4044',
        600: '#24262A',
        700: '#1D1F22',
        800: '#16181A',
        900: '#0F1012',
        950: '#080809',
      },
      secondary: '#2499ff',
    },
  },
  presets: [
    presetWind4({
      reset: true,
    }),
    presetIcons(),
  ],
  transformers: [transformerVariantGroup()],
})
