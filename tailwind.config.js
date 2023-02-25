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
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        inversed: 'var(--bg-inversed)',
        hover: 'var(--bg-hover)',
        success: 'var(--bg-success)',
        invalid: 'var(--bg-invalid)',
      },
      gridTemplateColumns: {
        video: 'repeat(auto-fill, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
