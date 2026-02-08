import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStackNavigator from '../navigations/dashboard-stack-navigator';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Drawer.Screen name="Category" component={DashboardStackNavigator} />
    </Drawer.Navigator>
  );
}
