/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#111111',       // Deep charcoal background
        paper: '#F4F0EA',     // Warm oat text
        signal: '#D97757',    // Muted terracotta accent
        muted: '#8A8A8A',     // Soft grey
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
