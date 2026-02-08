import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from '../navigations/auth-stack-navigator';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
