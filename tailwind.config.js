/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#397245",
        divider: "#878787"
      },
      fontFamily: {
        BonheurRoyale: "BonheurRoyale",
        LibreBodoni: "LibreBodoni",
        BodoniModa: "BodoniModa"
      },
      fontSize: {
        '2xs': '0.5rem'
      },
      borderWidth: {
        '1.4': '1.4px'
      },
      borderRadius: {
        '5xl': '2.5rem',
        '7xl': '3.5rem',
        '10xl': '5rem'
      }
    },
  },
  plugins: [],
}