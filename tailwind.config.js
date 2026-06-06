/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-deep': 'var(--bg-deep)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        gold: 'var(--gold)',
        brand: 'var(--brand)',
        'brand-600': 'var(--brand-600)',
        'brand-700': 'var(--brand-700)',
        'brand-50': 'var(--brand-50)',
        'brand-100': 'var(--brand-100)',
        accent: 'var(--accent)',
        'accent-600': 'var(--accent-600)',
        'accent-50': 'var(--accent-50)',
        'accent-ink': 'var(--accent-ink)',
        ok: 'var(--ok)',
        'ok-50': 'var(--ok-50)',
        warn: 'var(--warn)',
        'warn-50': 'var(--warn-50)',
        info: 'var(--info)',
        'info-50': 'var(--info-50)',
        danger: 'var(--danger)',
        'danger-50': 'var(--danger-50)',
        plum: 'var(--plum)',
        'plum-50': 'var(--plum-50)',
      },
      borderRadius: {
        'sm': 'var(--r-sm)',
        'DEFAULT': 'var(--r)',
        'lg': 'var(--r-lg)',
        'xl': 'var(--r-xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'lg': 'var(--shadow-lg)',
      }
    },
  },
  plugins: [],
}
