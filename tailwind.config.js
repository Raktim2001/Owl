module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {screens: {
      'xs': '290px',
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
   colors: {
        'black-rgba': 'rgba(255,255,255, 0.5)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
