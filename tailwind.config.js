/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        customColor: "rgba(255, 255, 255, 0.80)",
      },
    },
  },
  plugins: [require("daisyui")],
};
