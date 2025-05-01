/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        'accent-pink': '#FF69B4',
        'muted-pink': '#FFA5C1',
        'soft-pink': '#FFB6C1',
      },
      boxShadow: {
        'pink': '0 4px 14px 0 rgba(255, 105, 180, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFFFFF',
            a: {
              color: '#FF69B4',
              '&:hover': {
                color: '#FFA5C1',
              },
            },
          },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'pulse': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}