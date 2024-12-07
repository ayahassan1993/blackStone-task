/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark"],
  important: true,
  content: ["./src/**/*.{html,ts}", "./node_modules/@angular/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
