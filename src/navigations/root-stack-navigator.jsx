import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/auth-context';
import AuthStackNavigator from '../navigations/auth-stack-navigator';
import MainDrawerNavigator from '../navigations/main-drawer-navigator';
import ChangePasswordScreen from '../screens/main-screens/change-password-screen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainDrawerNavigator} />
          <Stack.Screen 
            name="ChangePassword" 
            component={ChangePasswordScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
