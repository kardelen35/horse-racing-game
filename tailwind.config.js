module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#667eea",
          dark: "#764ba2",
        },
        secondary: {
          DEFAULT: "#f093fb",
          dark: "#f5576c",
        },
        dark: {
          bg: "#1a1a2e",
          card: "#1e1e2e",
          lighter: "#252538",
        },
      },
      animation: {
        gallop: "gallop 0.3s infinite",
      },
      keyframes: {
        gallop: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-5px) rotate(-3deg)" },
          "50%": { transform: "translateY(0) rotate(0deg)" },
          "75%": { transform: "translateY(-5px) rotate(3deg)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
