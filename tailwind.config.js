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
          variant: "#F2F2F2",
        },
        dark: {
          default: "#212B36",
          shadow: "#00000075",
          variant: "#020202",
        },
        primary: {
          default: "#FFB6C1",
          variant: "#FFC0CB",
          accent: "#FF7086",
          t2: "#FFCDD5",
          t3: "#FFD1D7",
          t4: "#FFDBE0",
          t5: "#FFE5E9",
        },
        secondary: {
          default: "#FF45AA",
          variant: "#FF7AC2",
          accent: "#FF1493",
          t2: "#FF9FD3",
          t3: "#FFAFDB",
          t4: "#FFC1E3",
          t5: "#FFDBEF",
        },
        neutral: {
          primary: "#212B36",
          secondary: "#5E738A",
          800: "#333F4D",
          700: "#425263",
          600: "#516579",
          300: "#8D9DAE",
          200: "#ADB9C6",
          100: "#CCD5DE",
          50: "#F4F6F8",
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
