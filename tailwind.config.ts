import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: "#E6DFD9",
          gray: "#C7C7C7",
          green: "#1F4135",
          blue: "#4F6179",
          brown: "#63331C"
        },
        sand: {
          50: "#fbfaf9",
          100: "#f3f0ee",
          200: "#E6DFD9",
          300: "#d7cdc5",
          400: "#c7b8ad",
          500: "#b49f92",
          600: "#9a8275",
          700: "#7d675d",
          800: "#65534c",
          900: "#524440"
        },
        sage: {
          50: "#f3f6f5",
          100: "#e6edea",
          200: "#cddad3",
          300: "#aac0b5",
          400: "#7e9c8c",
          500: "#4f7768",
          600: "#1F4135",
          700: "#18352b",
          800: "#12281f",
          900: "#0e1f18"
        },
        ink: {
          50: "#f6f7f8",
          100: "#e9ecef",
          200: "#cfd6dc",
          300: "#b2bec8",
          400: "#8697a6",
          500: "#61788a",
          600: "#4b6071",
          700: "#3d4d5b",
          800: "#34424d",
          900: "#2f3942"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(31, 41, 55, 0.08)",
        ring: "0 0 0 6px rgba(31, 65, 53, 0.14)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
} satisfies Config;
