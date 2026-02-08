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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          animation: 'ios_from_left',
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          animation: 'ios_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
