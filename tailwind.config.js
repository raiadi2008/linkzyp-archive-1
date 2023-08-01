/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxl: { max: '1240px' },
      xl: { max: '1040px' },
      lg: { max: '840px' },
      md: { max: '720px' },
      sm: { max: '640px' },
      xs: { max: '480px' },
      xxs: { max: '320px' },
    },
    extend: {
      colors: {
        // main colors
        "primary": "#6e44ff",
        "primary-light": "#b892ff",

        // dark colors
        "dark-green": "#1a4301",
        "dark-red": "#da2c38",

        // neutral colors
        "neutral-white": "#FFF7F8",
        "neutral-dark": "#2b2d42",
        "neutral-blue": "#bfd7ff",
        "neutral-voilet": "#ffc6ff",
        "neutral-puprle": "#bdb2ff",
        "neutral-green": "#80ed99",
        "neutral-red": "#ff8fa3"
      },
      maxWidth: {
        'website': '1240px',
        'large-portfolio': '1240px',
        'medium-portfolio': "960px",
        'small-portfolio': "680px"
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}
