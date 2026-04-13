/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-black': '#121212',
        'spotify-dark': '#181818',
        'spotify-card': '#282828',
        'spotify-light': '#B3B3B3',
      },
      fontFamily: {
        'circular-book': [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Liberation Sans',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

