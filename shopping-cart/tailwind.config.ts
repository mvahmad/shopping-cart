// import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";


const {nextui} = require("@nextui-org/theme");
const config: Config =  {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  important: true,
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            primary: "#ffffff",
            secondary: "#B8BBC0",
            dark: "#141E2E",
            red: "#E50045",
            green: "#70A75C;",
            blue: "#1171FF",
          },
          backgroundColor: {
            white: "#ffffff",
            dark: "#141E2E",
            secondary: "#37404D",
            red: "#E50045",
            darkLight: "#1B273A",
            darkLighter: "#243042",
            green: "#70A75C;",
            blue: "#1171FF",
          },
        },
        dark: {
          layout: {},
          colors: {
            primary: "#ffffff",
            secondary: "#B8BBC0",
            dark: "#141E2E",
            red: "#E50045",
            green: "#70A75C;",
            blue: "#1171FF",
          },
          backgroundColor: {
            white: "#ffffff",
            dark: "#141E2E",
            secondary: "#37404D",
            red: "#E50045",
            darkLight: "#1B273A",
            darkLighter: "#243042",
            green: "#70A75C;",
            blue: "#1171FF",
          },
        },
      },
    }),
  ],
  theme: {
    extend: {
      
    },
  },
  darkMode: "class",
  // plugins: [nextui()],
} 
export default config
