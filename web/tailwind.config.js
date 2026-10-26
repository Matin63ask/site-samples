/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        soil: {
          DEFAULT: '#1A1612',
          950: '#120F0C',
          900: '#1A1612',
          800: '#211A15',
          700: '#2B2318',
          600: '#3B2F26',
          500: '#4E4034',
        },
        forest: {
          DEFAULT: '#315C32',
          900: '#24421F',
          800: '#2A4F2B',
          700: '#315C32',
          600: '#3E6F3D',
        },
        leaf: {
          DEFAULT: '#669A45',
          600: '#669A45',
          500: '#7CA944',
          400: '#8FBB5C',
        },
        sage: {
          DEFAULT: '#A5C78B',
          400: '#B9D4A4',
          300: '#C9DDB8',
        },
        ivory: {
          DEFAULT: '#F5F0E5',
          50: '#FBF9F3',
          100: '#F5F0E5',
        },
        oat: {
          DEFAULT: '#E8DFC9',
          300: '#EFE8D8',
          400: '#E8DFC9',
          500: '#DCCFB4',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '7.5xl': ['5.25rem', { lineHeight: '1.08' }],
      },
      maxWidth: {
        content: '1240px',
        reading: '68ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,22,18,0.04), 0 18px 40px -24px rgba(26,22,18,0.35)',
        lift: '0 28px 60px -30px rgba(26,22,18,0.55)',
      },
      transitionTimingFunction: {
        organic: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'leaf-sway': {
          '0%, 100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.6deg)' },
        },
        'root-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,0.61,0.36,1) both',
        'leaf-sway': 'leaf-sway 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
