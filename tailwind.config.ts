import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f6a623",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ['"Google Sans"', "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
