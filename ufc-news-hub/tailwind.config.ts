import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ufc: {
          red: '#D20A0A',
          redDark: '#8B0000',
          redLight: '#FF1A1A',
          gold: '#C9B037',
          goldDark: '#A89030',
        },
        dark: {
          bg: '#0A0A0A',
          card: '#141414',
          cardHover: '#1A1A1A',
          border: '#262626',
          text: '#FAFAFA',
          textMuted: '#A3A3A3',
        },
        category: {
          lutadores: '#3B82F6',
          lutas: '#D20A0A',
          backstage: '#8B5CF6',
        },
      },
      backgroundImage: {
        'octagon-grid': `
          repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px),
          linear-gradient(160deg, #12101a 0%, #16121e 50%, #12101a 100%)
        `,
        'hex-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fadeIn': 'fadeIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
        // Calendario animations
        'flip-down': 'flipDown 0.6s ease-in-out',
        'hover-lift': 'hoverLift 0.3s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        // Reels animations
        'like-pop': 'like-pop 0.3s ease-out',
        'slide-from-bottom': 'slide-from-bottom 0.3s ease-out',
        'draw-octagon': 'draw-octagon 2s ease-out forwards',
        // Arena Octagon Portal animations
        'float': 'float 6s ease-in-out infinite',
        // Ao Vivo animations
        'glow-red-border': 'glow-red-border 2s ease-in-out infinite',
        'flash-result': 'flash-result 1.5s ease-out',
        'slide-in-up': 'slide-in-up 0.4s ease-out',
        'float-up': 'floatUp 2s ease-out forwards',
        'glow-pulse-border': 'glow-pulse-border 3s ease-in-out infinite',
        'glow-neon-yellow': 'glow-neon-yellow 2s ease-in-out infinite',
        'glow-blue-card': 'glow-blue-card 3s ease-in-out infinite',
        'ticker': 'ticker linear infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(210, 10, 10, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(210, 10, 10, 0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Calendario keyframes
        flipDown: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(210,10,10,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(210,10,10,0.6)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-8px) scale(1.02)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Reels keyframes
        'like-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'draw-octagon': {
          '0%': { strokeDashoffset: '800' },
          '100%': { strokeDashoffset: '0' },
        },
        // Arena Octagon Portal keyframes
        'float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        'glow-pulse-border': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(210, 10, 10, 0.1), 8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(45,45,45,0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(210, 10, 10, 0.25), 8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(45,45,45,0.1)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Ao Vivo keyframes
        'glow-red-border': {
          '0%, 100%': { borderColor: 'rgba(210, 10, 10, 0.3)', boxShadow: '0 0 15px rgba(210, 10, 10, 0.1)' },
          '50%': { borderColor: 'rgba(210, 10, 10, 0.7)', boxShadow: '0 0 30px rgba(210, 10, 10, 0.3)' },
        },
        'flash-result': {
          '0%': { backgroundColor: 'rgba(34, 197, 94, 0.3)' },
          '50%': { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'glow-neon-yellow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.4))' },
          '50%': { filter: 'drop-shadow(0 0 12px rgba(250,204,21,0.8))' },
        },
        'glow-blue-card': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.08), 0 0 40px rgba(59,130,246,0.04)' },
          '50%': { boxShadow: '0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(59,130,246,0.08)' },
        },
        'floatUp': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-60px) scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(0.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
