/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          light: "#60a5fa",
          dark: "#1d4ed8"
        },
        ink: {
          DEFAULT: "#0f172a",
          soft: "#475569",
          softer: "#94a3b8"
        }
      },
      boxShadow: {
        soft: "0 10px 35px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
