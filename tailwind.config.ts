import type { Config } from 'tailwindcss'

export default {
  content: ['./app.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0c0c0c',
        surface: '#111111',
        border: '#1a1a1a',
        muted: '#555555',
        accent: '#00ff88',
        'accent-dim': '#00cc6a',
        amber: '#ffb800',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'Satoshi', 'sans-serif'],
        body: ['General Sans', 'Switzer', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
