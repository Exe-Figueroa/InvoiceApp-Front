/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        '01': '#7C5DFA',
        '02': '#9277FF',
        '03': '#1E2139',
        '04': '#252945',
        '05': '#DFE3FA',
        '06': '#888EB0',
        '07': '#7E88C3',
        '08': '#0C0E16',
        '09': '#EC5757',
        '10': '#9277FF',
        '11': '#F8F8FB',
        '12': '#141625',
        'btn-paid-color': '#33D69F',
        'btn-pending-color': '#FF8F00',
        'btn-draft-color': '#373B53'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        // spartan: ['League Spartan', 'sans-serif']
      },
      fontSize: {
        'spartanL': '2.25rem',
        'spartanM': '1.5rem',
        'spartanS': '0.938rem',
        'spartanP': '0.813rem'
      },
      backgroundImage: {
        'arrowDown': 'url(./src/assets/icon-arrow-down.svg)'
      }
    },
  },
}