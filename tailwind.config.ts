import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}", "./__tests__/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: "#1a1942"
        }
      },
      boxShadow: {
        glow: "0 10px 40px rgba(79, 70, 229, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
