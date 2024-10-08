/** @type {import('tailwindcss').Config} */
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    formsPlugin,
    typographyPlugin,
  ],
};

