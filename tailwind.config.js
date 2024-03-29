const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        inversed: 'var(--text-inversed)',
        success: 'var(--text-success)',
        invalid: 'var(--text-invalid)',
        warning: 'var(--text-warning)',
        hover: 'var(--text-hover)',
        active: 'var(--text-active)',
        'hover-inversed': 'var(--text-hover-inversed)',
        'active-inversed': 'var(--text-active-inversed)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        inversed: 'var(--bg-inversed)',
        hover: 'var(--bg-hover)',
        success: 'var(--bg-success)',
        invalid: 'var(--bg-invalid)',
        warning: 'var(--bg-warning)',
        hover: 'var(--bg-hover)',
        active: 'var(--bg-active)',
        'hover-inversed': 'var(--bg-hover-inversed)',
        'active-inversed': 'var(--bg-active-inversed)',
      },
      boxShadow: {
        '3d-r': '1rem 1rem var(--text-primary)',
        '3d-l': '-1rem 1rem var(--text-primary)',
      },
      gridTemplateColumns: {
        video: 'repeat(auto-fill, minmax(20rem, 1fr))',
      },
      maxWidth: {
        '8xl': 1408,
        '9xl': 1536,
        '10xl': 1664,
        '11xl': 1792,
        '12xl': 1920,
      },
      screens: {
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};
