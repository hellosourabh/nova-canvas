/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kimi-dark': '#1a1a1a',
        'kimi-sidebar': '#0d0d0d',
        'kimi-card': '#2a2a2a',
        'kimi-input': '#1e1e1e',
        'kimi-border': '#333333',
        'kimi-text': '#e5e5e5',
        'kimi-text-muted': '#888888',
        'kimi-accent': '#3b82f6',
      },
    },
  },
  plugins: [],
}
