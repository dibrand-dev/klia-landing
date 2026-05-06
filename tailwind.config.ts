import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        klia: {
          50:  '#F4F6FC',
          100: '#E8ECF8',
          500: '#5A6CB8',
          600: '#3F519E',
          700: '#2F3F82',
          DEFAULT: '#3F519E',
        },
        coral:  '#FF7A66',
        mint:   '#6FCF97',
        amber:  '#F4B860',
        ink:    '#0E1430',
        'ink-2':'#2A2F4A',
        slate:  '#5A607A',
        'slate-2': '#8990AA',
        line:   '#E5E7EF',
        'line-2': '#EFF1F7',
        'bg-alt': '#F7F8FB',
        'bg-3':   '#FBFAF7',
      },
      fontFamily: {
        display: ['"Geist"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        'sm-klia': '0 1px 2px rgba(14,20,48,.04), 0 1px 1px rgba(14,20,48,.03)',
        'md-klia': '0 4px 14px rgba(14,20,48,.06), 0 2px 4px rgba(14,20,48,.04)',
        'lg-klia': '0 30px 60px -20px rgba(14,20,48,.18), 0 10px 24px -10px rgba(14,20,48,.10)',
        'xl-klia': '0 50px 100px -20px rgba(14,20,48,.25), 0 20px 40px -15px rgba(14,20,48,.12)',
        'klia':    '0 6px 18px rgba(63,81,158,.30)',
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '14px',
        lg: '22px',
        xl: '28px',
      },
      animation: {
        float:    'float 6s ease-in-out infinite',
        float2:   'float 7s ease-in-out infinite -2s',
        float3:   'float 5s ease-in-out infinite -1s',
        marquee:  'marquee 40s linear infinite',
        'fade-up':'fadeUp .5s cubic-bezier(.2,.8,.2,1)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
