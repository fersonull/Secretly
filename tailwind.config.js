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
        'background-secondary': '#FAFAFA',
        'background-muted': '#F5F5F5',

        // Light Mode Text
        foreground: '#0A0A0A',
        'foreground-secondary': '#3F3F46',
        'foreground-muted': '#71717A',

        // Light Mode Borders
        border: '#E4E4E7',

        // Dark Mode Backgrounds (Clean Dark - Neutral Gray)
        'dark-background': '#27272A',
        'dark-background-card': '#2E2E32',
        'dark-background-secondary': '#3A3A3F',
        'dark-background-muted': '#323237',

        // Dark Mode Text
        'dark-foreground': '#FAFAFA',
        'dark-foreground-secondary': '#D4D4D8',
        'dark-foreground-muted': '#A1A1AA',

        // Dark Mode Borders
        'dark-border': '#3F3F46',

        // Semantic Colors - Primary (Brand)
        primary: {
          DEFAULT: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          foreground: '#FFFFFF',
        },
        'primary-foreground': '#FFFFFF',
        'dark-primary': '#3B82F6',
        'dark-primary-foreground': '#FFFFFF',

        // Secondary (for buttons/surfaces)
        secondary: {
          DEFAULT: '#F5F5F5',
          foreground: '#0A0A0A',
        },
        'secondary-foreground': '#0A0A0A',
        'dark-secondary': '#3A3A3F',
        'dark-secondary-foreground': '#FAFAFA',

        // Semantic Colors - Success
        success: {
          DEFAULT: '#10B981',
          600: '#059669',
          700: '#047857',
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
        input: '#F5F5F5',
        'dark-input': '#323237',

        // Legacy aliases for compatibility
        'muted-foreground': '#71717A',
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
