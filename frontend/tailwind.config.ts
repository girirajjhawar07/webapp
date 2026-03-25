import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        trustGreen: '#12B76A',
        trustYellow: '#F79009',
        trustRed: '#F04438',
        calmBlue: '#2563EB'
      }
    }
  },
  plugins: []
};

export default config;
