import { nextui } from "@nextui-org/theme";
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainColor: "rgba(0, 152, 218)",
        secondaryColor: "rgb(1, 156, 74)",
        thirdColor: "rgba(184, 0, 255)",
        grayBg: "rgb(245, 245, 245)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to))",
        "diagonal-gradient":
          "linear-gradient(to top left, var(--tw-gradient-from), var(--tw-gradient-to))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
