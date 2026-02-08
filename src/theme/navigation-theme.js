import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const LightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0EA5E9',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0A0A0A',
    border: '#E5E7EB',
    notification: '#EF4444',
  },
};

export const DarkNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0EA5E9',
    background: '#0A0A0A',
    card: '#171717',
    text: '#FAFAFA',
    border: '#262626',
    notification: '#EF4444',
  },
};
