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
          50: "#fdfcfc",
          100: "#f7f5f4",
          200: "#E6DFD9",
          300: "#d5cbc2",
          400: "#c4b5ab",
          500: "#b19d93",
          600: "#948076",
          700: "#7a6860",
          800: "#64554f",
          900: "#534742"
        },
        sage: {
          50: "#f3f5f4",
          100: "#e4e9e7",
          200: "#cad3d0",
          300: "#a7b7b0",
          400: "#7d968c",
          500: "#4f7567",
          600: "#1F4135",
          700: "#1a352c",
          800: "#142a23",
          900: "#0f211c"
        },
        ink: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d7dce1",
          300: "#b6c0ca",
          400: "#8c9db0",
          500: "#6a7f98",
          600: "#4F6179",
          700: "#3e4e61",
          800: "#344050",
          900: "#0f172a" // preto escuro para as letras
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(31, 65, 53, 0.12)",
        ring: "0 0 0 6px rgba(31, 65, 53, 0.18)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
} satisfies Config;
