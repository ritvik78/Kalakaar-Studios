/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        brand: {
          black: "#0a0a0a",
          dark: "#121212",
          gray: "#1c1c1c",
          lightGray: "#2a2a2a",
          red: {
            DEFAULT: "#e50914",
            glow: "#ff3e3e",
            dark: "#8f060c",
            bright: "#ff1e27"
          },
          gold: {
            DEFAULT: "#d4af37",
            glow: "#ffe066",
            dark: "#997d15",
            pale: "#f3e5ab"
          },
          silver: {
            DEFAULT: "#cbd5e1",
            metal: "#8a95a5",
            bright: "#f8fafc"
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "sans-serif"],
        display: ["var(--font-syncopate)", "sans-serif"],
      },
      backgroundImage: {
        'brushed-metal': "linear-gradient(135deg, #121212 0%, #1c1c1c 50%, #121212 100%)",
        'carbon-fiber': "radial-gradient(circle, #151515 20%, transparent 20%), radial-gradient(circle, #151515 20%, transparent 20%)",
        'glass-gradient': "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        'red-gold-gradient': "linear-gradient(90deg, #e50914 0%, #d4af37 100%)",
        'glow-gradient': "radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)"
      },
      animation: {
        'sheen': 'sheen 4s ease-in-out infinite',
        'bubble-slow': 'bubble 12s ease-in-out infinite',
        'bubble-medium': 'bubble 8s ease-in-out infinite',
        'bubble-fast': 'bubble 5s ease-in-out infinite',
        'drip': 'drip 3s ease-in-out infinite',
        'fizz': 'fizz 0.5s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        sheen: {
          '0%': { transform: 'translateX(-100%) rotate(25deg)' },
          '100%': { transform: 'translateX(200%) rotate(25deg)' },
        },
        bubble: {
          '0%, 100%': { transform: 'translateY(0) scale(1) translateX(0)', opacity: 0.2 },
          '50%': { transform: 'translateY(-100px) scale(1.1) translateX(15px)', opacity: 0.8 },
        },
        drip: {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1, transform: 'translateY(80px) scaleY(1.2)' },
          '100%': { transform: 'translateY(100px) scaleY(0)', opacity: 0 },
        },
        fizz: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)', opacity: 0.3 },
          '50%': { transform: 'scale(1.2) translate(2px, -3px)', opacity: 0.8 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-border': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
        'red-glow': '0 0 15px rgba(229, 9, 20, 0.4)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
};
