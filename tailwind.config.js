/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pastel-blue": "#d0ebff",
        "pastel-purple": "#e0c3fc",
        "pastel-pink": "#ffd6e0",
        "pastel-light": "#fdf6f0",
        "pastel-bg": "#f8fafd",
      },
    },
  },
  plugins: [],
};
