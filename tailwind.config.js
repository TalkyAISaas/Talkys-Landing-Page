import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hsl))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        plum: { 50: 'var(--plum-50)', 100: 'var(--plum-100)', 200: 'var(--plum-200)', 300: 'var(--plum-300)', 400: 'var(--plum-400)', 500: 'var(--plum-500)', 600: 'var(--plum-600)', 700: 'var(--plum-700)', 800: 'var(--plum-800)', 900: 'var(--plum-900)', 950: 'var(--plum-950)' },
        indigo: { 50: 'var(--indigo-50)', 100: 'var(--indigo-100)', 200: 'var(--indigo-200)', 300: 'var(--indigo-300)', 400: 'var(--indigo-400)', 500: 'var(--indigo-500)', 600: 'var(--indigo-600)', 700: 'var(--indigo-700)', 800: 'var(--indigo-800)', 900: 'var(--indigo-900)', 950: 'var(--indigo-950)' },
        electric: { 50: 'var(--blue-50)', 100: 'var(--blue-100)', 200: 'var(--blue-200)', 300: 'var(--blue-300)', 400: 'var(--blue-400)', 500: 'var(--blue-500)', 600: 'var(--blue-600)', 700: 'var(--blue-700)', 800: 'var(--blue-800)', 900: 'var(--blue-900)', 950: 'var(--blue-950)' },
        izzi: {
          bg: {
            primary: 'var(--bg-primary)',
            secondary: 'var(--bg-secondary)',
            surface: 'var(--bg-surface)',
            card: 'var(--bg-card)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            glow: 'var(--accent-glow)',
            secondary: 'var(--accent-secondary)',
            tertiary: 'var(--accent-tertiary)',
          },
          text: {
            primary: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            muted: 'var(--text-muted)',
          },
          border: 'var(--border-color)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "var(--shadow-sm)",
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        cta: "var(--shadow-cta)",
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "dash-flow": "dash-flow 1.6s linear infinite",
      },
      backgroundImage: {
        'cta-gradient': 'var(--cta-gradient)',
        'brand-rule': 'var(--brand-rule)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
