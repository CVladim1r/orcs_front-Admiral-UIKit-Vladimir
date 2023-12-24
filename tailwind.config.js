/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'vtb-table': ['VTB Group UI', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
