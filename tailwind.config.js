const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  plugins: [
    flowbite.plugin(),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // background: "#121b25",
        background: "#0f172a",
        foreground: "var(--foreground)",
        greenbg:'#3aaf9e',
        green1:'#00715e',
      },
    },
  },
};
