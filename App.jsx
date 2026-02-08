import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './src/navigations/root-stack-navigator';
import Providers from './src/providers/providers';
import {
  LightNavigationTheme,
  DarkNavigationTheme,
} from './src/theme/navigation-theme';
import './global.css';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={
        colorScheme === 'dark' ? DarkNavigationTheme : LightNavigationTheme
      }
    >
      <Providers>
        <RootStackNavigator />
      </Providers>
    </NavigationContainer>
  );
}
