/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s ease-in 1.5',
        'pulse': 'pulse 1s ease-in 1',
      }
    },
  },
  plugins: [],
}