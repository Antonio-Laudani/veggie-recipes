/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
      sans: ["Lexend", "sans-serif"],
    },
      colors:{
           // Light mode
        "light-background": "#F5F5DC",
        "light-green": "#4CAF50",
        "dark-green": "#2E7D32",
        "light-gray": "#555555",

        // Dark mode
        "dark-background": "#121212",
        "bright-green": "#81C784",
        "green-darkest": "#1B5E20",
        "dark-gray": "#CCCCCC",
      },
       boxShadow: {
       "dark-green-sm": "0 2px 4px rgba(46,125,50,0.3)",  
  "dark-green-md": "0 4px 6px rgba(46,125,50,0.5), 0 2px 4px rgba(46,125,50,0.5)",
  "dark-green-lg": "0 10px 15px rgba(46,125,50,0.6), 0 4px 6px rgba(46,125,50,0.6)",
      },
    },
  },
  plugins: [
   require('flowbite/plugin')
  ],
}
