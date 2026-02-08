import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './src/navigations/root-stack-navigator';
import Providers from './src/providers/providers';
import './global.css';

export default function App() {
  return (
    <NavigationContainer>
      <Providers>
        <RootStackNavigator />
      </Providers>
    </NavigationContainer>
  );
}
