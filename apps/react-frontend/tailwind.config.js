/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
    colors: {
        background: {
          900: "#0C1722",
          800: "#242E38",
          700: "#3C454E",
          600: "#545C64",
        },
        secondary: "#212F3C",
        primary: "#F3F6F7",
    }
  },
  plugins: [],
}

