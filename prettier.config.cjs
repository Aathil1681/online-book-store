module.exports = {
    plugins: ["prettier-plugin-tailwindcss"],
      theme: {
    extend: {
      colors: {
        olive: {
          700: "#556B2F",
          900: "#3B4B14",
          500: "#76875a", // optional lighter olive for focus ring or hover
        },
        cream: "#F9F9F4",
      },
    },
  },
  };