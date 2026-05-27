/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#effef3',
          100: '#d4fddb',
          200: '#a8f8b6',
          300: '#7bf490',
          400: '#55ed71',
          500: '#29dd52',
          600: '#1cbc43',
          700: '#189538',
          800: '#16752f',
          900: '#155f29',
        },
        ocean: {
          50: '#f7fff7',
          100: '#ecfceb',
          200: '#d7f7d6',
          300: '#b2ebaf',
          400: '#84da81',
          500: '#59c55a',
          600: '#40a845',
          700: '#35843a',
          800: '#2d6932',
          900: '#28552d',
        },
        ink: {
          50: '#f3f7fb',
          100: '#dbe5ef',
          200: '#bcccdc',
          300: '#92aac0',
          400: '#6786a2',
          500: '#4b6884',
          600: '#38516a',
          650: '#2a4359',
          950: '#07111f',
          900: '#0d1a2c',
          800: '#13253a',
          700: '#1e3651',
        },
        sand: {
          50: '#f7faf4',
          100: '#edf3e8',
          200: '#dde8d4',
        },
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        halo: '0 25px 70px -25px rgba(28, 188, 67, 0.35)',
        luxe: '0 24px 80px -28px rgba(7, 17, 31, 0.28)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at top left, rgba(41, 221, 82, 0.18), transparent 34%), radial-gradient(circle at top right, rgba(123, 244, 144, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(247, 250, 244, 0.94))',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        rise: 'rise 0.7s ease-out both',
        pulseLine: 'pulseLine 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.35', transform: 'scaleX(0.96)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};
