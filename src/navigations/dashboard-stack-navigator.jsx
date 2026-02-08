import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/main-screens/dashboard-screen';

const BottomTab = createBottomTabNavigator();

export default function DashboardStackNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Dashboard" component={DashboardScreen} />
    </BottomTab.Navigator>
  );
}
