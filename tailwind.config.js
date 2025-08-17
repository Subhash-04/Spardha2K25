/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'audiowide': ['Audiowide', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      colors: {
        background: 'hsl(220, 50%, 4%)',
        foreground: 'hsl(210, 100%, 95%)',
        primary: {
          DEFAULT: 'hsl(195, 100%, 50%)', /* Updated to cyan blue */
          glow: 'hsl(195, 100%, 65%)',
        },
        accent: 'hsl(195, 100%, 60%)',
        secondary: 'hsl(220, 50%, 10%)',
        muted: {
          DEFAULT: 'hsl(220, 50%, 8%)',
          foreground: 'hsl(220, 30%, 60%)',
        },
        card: 'hsl(220, 50%, 6%)',
        border: 'hsl(220, 50%, 18%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-subtle': 'glow-subtle 4s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-3d': 'float-3d 6s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'holographic-flow': 'holographic-flow 4s ease-in-out infinite',
        'crystal-rotate': 'crystal-rotate 8s linear infinite',
        'crystal-rotate-reverse': 'crystal-rotate 12s linear infinite reverse',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px hsl(195, 100%, 65%))' },
          '50%': { filter: 'drop-shadow(0 0 20px hsl(195, 100%, 65%))' },
        },
        'glow-subtle': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 200, 255, 0.3)' },
          '50%': { boxShadow: '0 0 15px rgba(0, 200, 255, 0.6)' },
        },
        'float-3d': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'translateY(-20px) rotateX(2deg) rotateY(5deg)' },
          '50%': { transform: 'translateY(0px) rotateX(0deg) rotateY(10deg)' },
          '75%': { transform: 'translateY(-10px) rotateX(-2deg) rotateY(5deg)' },
        },
        'scan-line': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'holographic-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'crystal-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        '4xl': '100px',
      },
      boxShadow: {
        'glow': '0 0 10px rgba(0, 200, 255, 0.4)',
        'glow-sm': '0 0 5px rgba(0, 200, 255, 0.3)',
        'glow-lg': '0 0 25px rgba(0, 200, 255, 0.5)',
      },
    },
  },
  plugins: [],
}

