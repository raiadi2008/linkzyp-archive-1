/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
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
      backgroundImage: {
        'notion-theme-image': "url('../public/themes-heros/notion-theme.svg')",
        'shadow-theme-image': "url('../public/themes-heros/vector.svg')"
      },
      backgroundColor: {
        'notion-theme-image-opacity': 'rgba(0, 0, 0, 0.5)' // Adjust the opacity value as needed
      },
      boxShadow: {

        '-2xl': '0px -2px 13px  rgba(0, 0, 0, 0.05)',
        '-8xl': '0px -3px 32px  rgba(0, 0, 0, 0.1)',
        'solid-4xl': '6px 6px 0px rgba(255, 255, 255)'
      },
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
        'large-website': "960px",
        'medium': "840px",
        'small': "680px",
        'micro': "480px"
      },
      width: {
        '102': '28rem',
        '112': '32rem'
      },
      height: {
        '112': '32rem'

      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');

    }

  ],
  safelist: [
    "bg-blue-100",
    "bg-red-100",
    "bg-green-100",
    "bg-amber-100",
  ]
}
