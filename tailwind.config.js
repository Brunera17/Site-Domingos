// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E8610A",
        dark: "#0C0C0C",
        card: "#181818",
        border: "#2A2A2A",
        muted: "#777",
        bronze: "#CD7F32",
        silver: "#A8A9AD",
        gold: "#D4AF37",
        diamond: "#38C4D8",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
      },
    },
  },
};