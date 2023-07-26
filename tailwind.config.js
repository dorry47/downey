/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'dse-gold': '#d98e48',
        'dse-orange': '#db6035',
      },

      borderColor: {
        'dse-peach': '#eed9d4',
        'dse-orange': '#db6035',
      },
      fontFamily: {
        display: [
          'GT Sectra Display',
          'GT Sectra',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      fontSize: {
        xxs: '0.6rem',
      },
      letterSpacing: {
        extrawide: '0.2rem',
      },
    },
  },
  plugins: [],
};
