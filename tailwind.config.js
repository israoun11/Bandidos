/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // dark olive backdrop — used only for the cinematic 3D track
        ink: {
          950: '#14150E',
          900: '#1C1E14',
          800: '#252919',
          700: '#333820',
        },
        // real menu paper — cream/beige, used for all content sections
        cream: {
          50: '#FBF6E9',
          100: '#F6ECD1',
          200: '#F1E1B8',
          300: '#E6D39C',
        },
        // the brand green sampled straight from the printed menu headings
        green: {
          900: '#223021',
          800: '#2D3F2A',
          700: '#3A4F35',
          600: '#4C6A4A',
          500: '#5D7F58',
        },
        gold: {
          400: '#ECC65C',
          500: '#D8A93A',
        },
      },
      fontFamily: {
        display: ['"Anton"', '"Archivo Black"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
