/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf8',
          100: '#d5f6ef',
          200: '#adeadd',
          300: '#7ad8c4',
          400: '#46bfaa',
          500: '#22a38f',
          600: '#168172',
          700: '#12665d',
          800: '#114f4a',
          900: '#0f423e',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 66, 62, 0.12)',
      },
    },
  },
  plugins: [],
};
