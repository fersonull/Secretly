import { useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStackNavigator from '../navigations/dashboard-stack-navigator';
import CategoryTopTabsNavigator from '../navigations/category-top-tabs-navigator';
import SettingsScreen from '../screens/main-screens/settings-screen';
import CustomDrawerContent from '../components/common/custom-drawer-content';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  const colorScheme = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
          width: 300,
        },
        drawerActiveTintColor: '#0EA5E9',
        drawerInactiveTintColor: isDark ? '#A1A1AA' : '#6B7280',
        drawerLabelStyle: {
          fontFamily: 'InstrumentSans-Medium',
          fontSize: 15,
        },
        drawerItemStyle: {
          borderRadius: 6,
          marginVertical: 2,
        },
        drawerContentContainerStyle: {
          paddingTop: 0,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Drawer.Screen name="Categories" component={CategoryTopTabsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
