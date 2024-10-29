/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'principal': '#e5c0fa',
        'title': '#811de5',
        'accent': '#e51dc0',
        'accent-light': '#ff94eb',
        'light': '#f5f5f5',
        'text':'#0f0f0f80'
      },
      fontFamily: {
        'playpen': ['"Playpen Sans"', 'sans-serif'],
        'dosis': ['"Dosis"', 'sans-serif'],
      },
      screens: {
        'sm-380': '380px', 
        'sm-800': '800px',
        'sm-970': '970px',
      },
    },
  },
  plugins: [],
}

