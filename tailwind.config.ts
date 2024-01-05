import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.tsx'],
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
    },
  },
  plugins: [],
} satisfies Config
