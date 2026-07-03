/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        navy: '#0a1a3a',
        'navy-light': '#1a2d5a',
        'navy-lighter': '#2a3d7a',
        
        // Gold for highlights
        gold: '#d4af37',
        'gold-dark': '#b8941f',
        'gold-light': '#e5c158',
        
        // Purple and Crimson
        purple: '#6d28d9',
        'purple-dark': '#4c1d95',
        crimson: '#dc2626',
        'crimson-dark': '#991b1b',
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #0a1a3a 0%, #1a2d5a 50%, #2a3d7a 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)',
        'gradient-portal': 'linear-gradient(135deg, rgba(106, 17, 203, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(212, 175, 55, 0.4)',
        'glow-purple': '0 0 30px rgba(109, 40, 217, 0.4)',
        'glow-crimson': '0 0 30px rgba(220, 38, 38, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
