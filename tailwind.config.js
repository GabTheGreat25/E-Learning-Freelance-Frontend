/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  prefix: "",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "320px",
        xs: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        light: {
          default: "#FAF7F7",
          shadow: "#4C4C4C",
          variant: "#F2F2F2",
        },
        dark: {
          default: "#101010",
          shadow: "#00000075",
          variant: "#020202",
        },
      },
    },
  },
  daisyui: {
    themes: false,
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: false,
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animate"),
    require("daisyui"),
  ],
};
