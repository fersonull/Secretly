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
        // Light Mode Backgrounds
        background: '#FFFFFF',
        'background-card': '#FFFFFF',
        'background-secondary': '#F9FAFB',
        'background-muted': '#F3F4F6',

        // Light Mode Text
        foreground: '#0A0A0A',
        'foreground-secondary': '#374151',
        'foreground-muted': '#6B7280',

        // Light Mode Borders
        border: '#E5E7EB',

        // Dark Mode Backgrounds
        'dark-background': '#0A0A0A',
        'dark-background-card': '#171717',
        'dark-background-secondary': '#27272A',
        'dark-background-muted': '#1C1C1C',

        // Dark Mode Text
        'dark-foreground': '#FAFAFA',
        'dark-foreground-secondary': '#D4D4D8',
        'dark-foreground-muted': '#A1A1AA',

        // Dark Mode Borders
        'dark-border': '#262626',

        // Semantic Colors - Primary (Brand)
        primary: {
          DEFAULT: '#0EA5E9',
          600: '#0284C7',
          700: '#075985',
          foreground: '#FFFFFF',
        },

        // Semantic Colors - Success
        success: {
          DEFAULT: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          foreground: '#FFFFFF',
        },

        // Semantic Colors - Warning
        warning: {
          DEFAULT: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          foreground: '#FFFFFF',
        },

        // Semantic Colors - Danger
        danger: {
          DEFAULT: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          foreground: '#FFFFFF',
        },

        // Alias for input fields
        input: '#F3F4F6',
        'dark-input': '#1C1C1C',

        // Legacy aliases for compatibility
        'muted-foreground': '#6B7280',
        'dark-muted-foreground': '#A1A1AA',
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
