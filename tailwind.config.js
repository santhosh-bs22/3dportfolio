// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0e17',
          navy: '#1a1f2e',
          blue: '#1F4E79',
          light: '#00d9ff',
          purple: '#9d4edd',
          accent: '#1F4E79'
        },
        cyber: {
          dark: '#0d1117',
          green: '#00ff88',
          blue: '#0088ff',
          pink: '#ff0088'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 8s ease infinite',
        'text-gradient': 'text-gradient 3s ease infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'neon': 'neon 1.5s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'text-gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        neon: {
          '0%': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00d9ff' },
          '100%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00d9ff' }
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0e17 0%, #1a1f2e 50%, #1F4E79 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #0d1117 0%, #0088ff 50%, #00ff88 100%)',
        'stars': 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(2px 2px at 50px 160px, #ddd, transparent), radial-gradient(2px 2px at 90px 40px, #fff, transparent), radial-gradient(2px 2px at 130px 80px, #fff, transparent), radial-gradient(2px 2px at 160px 120px, #ddd, transparent)'
      }
    },
  },
  plugins: [],
}