/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // use the .dark class
  theme: {
    extend: {
      colors: {
        green: "var(--color-green)",
        "gray-100": "var(--color-gray-100)",
        "gray-900": "var(--color-gray-900)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("dark", "&:where(.dark, .dark *)");
    },
  ],
};
