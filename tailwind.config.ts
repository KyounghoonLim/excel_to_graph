import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import modules from './styles/tailwind/module'
import utilities from './styles/tailwind/plugin/utilities'
import functions from './styles/tailwind/plugin/functions'
import components from './styles/tailwind/plugin/components'

export default {
  content: ['./{app,components,providers,hooks}/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      ...modules,
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, matchUtilities, theme }) {
      addUtilities(utilities)
      addComponents({ ...components })
      matchUtilities(functions, { values: theme('color') })
    }),
  ],
} satisfies Config
