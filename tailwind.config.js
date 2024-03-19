/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'p-blue': '#2D5F91',
        'p-red': '#FCA396',
        'p-bluef': '#2D5F91',
        'p-redf': '#FCA396',

      },
      fontFamily: {
        dongle: ["Dongle", "sans-serif"],
      },
    },
  },
  plugins: [],
}
