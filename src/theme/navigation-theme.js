import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const LightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3B82F6',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0A0A0A',
    border: '#E4E4E7',
    notification: '#EF4444',
  },
};

export const DarkNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3B82F6',
    background: '#27272A',
    card: '#2E2E32',
    text: '#FAFAFA',
    border: '#3F3F46',
    notification: '#EF4444',
  },
};
