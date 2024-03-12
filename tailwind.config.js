/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        'footer': '73% 27%',
        'new': '48% 52%',
      }
    },
    fontFamily: {
      signature: ["Kode Mono"],
      every: ["Montserrat"],
      number: ["Roboto Mono"],
    }
  },
  plugins: [],
}

