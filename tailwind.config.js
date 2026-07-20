/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

export default {
  // 本專案用 <html themeColor="dark"> 切換佈景，而非 Tailwind 預設的 class="dark"。
  // 掛上對應的 variant，dark: 前綴才會真的生效。
  darkMode: ['variant', '&:where([themeColor="dark"], [themeColor="dark"] *)'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.gray, // Dark mode Datepicker color

        // 設計 token — 實際值定義在 scss/base/root.scss，隨佈景切換
        ink: {
          base: "rgb(var(--c-base) / <alpha-value>)",
          surface: "rgb(var(--c-surface) / <alpha-value>)",
          raised: "rgb(var(--c-raised) / <alpha-value>)",
        },
        content: {
          strong: "rgb(var(--c-text-strong) / <alpha-value>)",
          DEFAULT: "rgb(var(--c-text) / <alpha-value>)",
          muted: "rgb(var(--c-text-muted) / <alpha-value>)",
          faint: "rgb(var(--c-text-faint) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          soft: "rgb(var(--c-accent-soft) / <alpha-value>)",
          contrast: "rgb(var(--c-accent-contrast) / <alpha-value>)",
        },
        hairline: "rgb(var(--c-line) / <alpha-value>)",
      },
      fontFamily: {
        display: ['Sora', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // 隨視窗縮放的展示級字級
        'display-xl': ['clamp(3rem, 11vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.125rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        shell: '78rem',
        prose: '42rem',
      },
      // 預設的透明度階級只有 5 的倍數，這裡補齊細緻的中間值，
      // 讓 border-hairline/8、bg-ink-surface/72 這類寫法能正確產生
      opacity: {
        2: '0.02', 4: '0.04', 6: '0.06', 8: '0.08', 12: '0.12', 14: '0.14',
        15: '0.15', 16: '0.16', 18: '0.18', 22: '0.22', 24: '0.24', 28: '0.28',
        32: '0.32', 35: '0.35', 36: '0.36', 38: '0.38', 42: '0.42', 45: '0.45',
        48: '0.48', 55: '0.55', 62: '0.62', 65: '0.65', 68: '0.68', 72: '0.72',
        78: '0.78', 82: '0.82', 85: '0.85', 88: '0.88', 92: '0.92', 95: '0.95',
        98: '0.98',
      },
      borderRadius: {
        card: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.04), 0 12px 32px -12px rgb(0 0 0 / 0.12)',
        lift: '0 2px 4px rgb(0 0 0 / 0.06), 0 24px 48px -16px rgb(0 0 0 / 0.22)',
        glow: '0 0 0 1px rgb(var(--c-accent) / 0.35), 0 8px 40px -8px rgb(var(--c-accent) / 0.45)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        crisp: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(120%)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
