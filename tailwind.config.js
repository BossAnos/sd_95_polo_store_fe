/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    }
  },
  backgroundColor: (theme) => ({
    ...theme("colors"),
    main: "#3b82f6",
  }),
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "1700px",
  },
  width: {
    "400": "400px",
    "600": "600px",
    "1/4": "25%",
    "1/2": "50%",
    "3/4": "75%",
    full: "100%",
    "518": "518px",
    "287": "287px",
  },
  minWidth: {
    "0": "0",
    "300": "300px",
    "1/4": "25%",
    "1/2": "50%",
    "3/4": "75%",
    full: "100%",
  },
  maxHeight: {
    "0": "0",
    "280": "280px",
    "420": "420px",
    "1/4": "25%",
    "1/2": "50%",
    "3/4": "75%",
    full: "100%",
  },
  fontSize: {
    "3": "12px",
    "25/2": "50px",
  },
  extend: {
    boxShadow: {
      "3xl": "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
    },
    padding: {
      "padding-10-24": "10px 24px 10px 24px",
    },
    colors: {
      main: "#3b82f6",
      // "pink-light": "rgba(236, 230, 240, 1)",
      // "blue-light": "rgba(58, 161, 255, 1)",
      // "green-light": "rgba(73, 227, 107, 1)",
      // "yellow-light": "rgba(255, 238, 88, 1)",
    },
    width: {
      "width-100": "100px",
      "width-360": "360px",
      "width-57": "57px",
      "width-87": "87px",
    },
    height: {
      "height-40": "40px",
      "height-32": "32px",
    },
  },
  plugins: [],
}

