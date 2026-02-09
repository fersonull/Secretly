import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/main-screens/dashboard-screen';
import CredentialListScreen from '../screens/main-screens/credential-list-screen';
import ViewCredentialScreen from '../screens/main-screens/view-credential-screen';
import AddEditCredentialScreen from '../screens/main-screens/add-edit-credential-screen';

const Stack = createNativeStackNavigator();

export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CredentialList" component={CredentialListScreen} />
      <Stack.Screen name="ViewCredential" component={ViewCredentialScreen} />
      <Stack.Screen
        name="AddEditCredential"
        component={AddEditCredentialScreen}
      />
    </Stack.Navigator>
  );
}
