import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFB6C1",
        "primary-dark": "#FF8FA3",
        secondary: "#B5EAD7",
        accent: "#FFDAC1",
        cream: "#FFF9F4",
        ink: "#3D3D3D",
        muted: "#8A8A8A",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
        hand: ["var(--font-gaegu)", "cursive"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(255,182,193,0.35)",
        pop: "0 6px 0 rgba(0,0,0,0.08)",
      },
      borderRadius: {
        chunky: "20px",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 1.2s ease-in-out infinite",
        float: "float 2.4s ease-in-out infinite",
        pop: "pop 0.4s cubic-bezier(.34,1.56,.64,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
