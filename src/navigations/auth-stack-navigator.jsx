import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth-screens/login-screen';
import RegisterScreen from '../screens/auth-screens/register-screen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
