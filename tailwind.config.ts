import { nextui } from '@nextui-org/react'
import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'copper-canyon': '#D87D4A',
        'eclipse-black': '#101010',
        'frost-whisper': '#F1F1F1',
        'snow-drift': '#FAFAFA',
        'peachy-sunset': '#FBAF85',
        'crimson-tide': '#CD2C2C',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      fontSize: {
        'xs-plus': '0.8125rem',
        'sm-plus': '0.9375rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: '#101010',
            },
          },
        },
        dark: {
          colors: {
            background: {
              DEFAULT: '#101010',
            },
          },
        },
      },
    }),
  ],
} satisfies Config
