/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app.{jsx,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        dancing: 'DancingScript-Regular',
        'dancing-medium': 'DancingScript-Medium',
        'dancing-bold': 'DancingScript-Bold',
        allura: 'Allura-Regular',
        cookie: 'Cookie-Regular',
        sans: 'InstrumentSans-Regular',
        'sans-bold': 'InstrumentSans-Bold',
        'sans-medium': 'InstrumentSans-Medium',
      },
      colors: {
        border: 'hsl(214.3 31.8% 91.4%)',
        input: 'hsl(214.3 31.8% 91.4%)',
        ring: 'hsl(222.2 84% 4.9%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 84% 4.9%)',

        primary: {
          DEFAULT: 'hsl(222.2 47.4% 11.2%)',
          foreground: 'hsl(210 40% 98%)',
        },

        secondary: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },

        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(210 40% 98%)',
        },

        muted: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(215.4 16.3% 46.9%)',
        },

        accent: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },

        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(222.2 84% 4.9%)',
        },

        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(222.2 84% 4.9%)',
        },

        // Dark mode colors
        dark: {
          border: 'hsl(217.2 32.6% 17.5%)',
          input: 'hsl(217.2 32.6% 17.5%)',
          ring: 'hsl(212.7 26.8% 83.9%)',
          background: 'hsl(222.2 84% 4.9%)',
          foreground: 'hsl(210 40% 98%)',

          primary: {
            DEFAULT: 'hsl(210 40% 98%)',
            foreground: 'hsl(222.2 47.4% 11.2%)',
          },

          secondary: {
            DEFAULT: 'hsl(217.2 32.6% 17.5%)',
            foreground: 'hsl(210 40% 98%)',
          },

          destructive: {
            DEFAULT: 'hsl(0 62.8% 30.6%)',
            foreground: 'hsl(210 40% 98%)',
          },

          muted: {
            DEFAULT: 'hsl(217.2 32.6% 17.5%)',
            foreground: 'hsl(215 20.2% 65.1%)',
          },

          accent: {
            DEFAULT: 'hsl(217.2 32.6% 17.5%)',
            foreground: 'hsl(210 40% 98%)',
          },

          popover: {
            DEFAULT: 'hsl(222.2 84% 4.9%)',
            foreground: 'hsl(210 40% 98%)',
          },

          card: {
            DEFAULT: 'hsl(222.2 84% 4.9%)',
            foreground: 'hsl(210 40% 98%)',
          },
        },
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
    },
  },
  plugins: [],
};
