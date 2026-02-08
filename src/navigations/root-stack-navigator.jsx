import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from '../navigations/auth-stack-navigator';
import MainDrawerNavigator from '../navigations/main-drawer-navigator';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
      }}
    >
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="Main" component={MainDrawerNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
