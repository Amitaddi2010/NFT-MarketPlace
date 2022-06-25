module.exports = {
  theme: {
    
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif']
      },
      colors: {
        'link-blue': '#808292',
        'primary':'#2D2879',
        'secondary':'#9091DC',
        'tert':'#191D3C',
        'tblue':'rgba(99,88,189 , 0.19)'
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}