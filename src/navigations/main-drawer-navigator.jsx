import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStackNavigator from '../navigations/dashboard-stack-navigator';
import CategoryTopTabsNavigator from '../navigations/category-top-tabs-navigator';
import SettingsScreen from '../screens/main-screens/settings-screen';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Drawer.Screen name="Categories" component={CategoryTopTabsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
