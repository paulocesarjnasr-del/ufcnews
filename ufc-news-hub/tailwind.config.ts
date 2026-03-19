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
        'glow-pulse-border': 'glow-pulse-border 3s ease-in-out infinite',
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
      },
    },
  },
  plugins: [typography],
};

export default config;
