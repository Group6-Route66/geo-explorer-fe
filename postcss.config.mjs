const config = {
  plugins: {
    "@tailwindcss/postcss": {
      darkMode: "class",
      theme: {
        container: {
          center: true,
        },
        extend: {
          colors: {
            customgreen: "#49e659",
          },
        },
      },
    },
  },
};

export default config;
