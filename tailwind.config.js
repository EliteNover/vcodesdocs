/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          5: '#090a0f',
          4: '#18191d',
          3: '#050505',
          2: '#0A0B11',
          1: '#0D0E15'
        }
      },
      maxWidth: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "98.6rem",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
