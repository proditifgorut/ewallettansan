/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark-blue': '#0D1B2A',
        'brand-gold': '#E8B23A',
        'brand-light-gray': '#F0F2F5',
        'brand-text': '#E0E1DD',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
