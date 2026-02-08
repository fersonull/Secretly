import { useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStackNavigator from '../navigations/dashboard-stack-navigator';
import CategoryTopTabsNavigator from '../navigations/category-top-tabs-navigator';
import SettingsScreen from '../screens/main-screens/settings-screen';
import CustomDrawerContent from '../components/common/custom-drawer-content';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  const theme = useTheme();
  const inactiveTint = theme.dark
    ? 'hsl(215 20.2% 65.1%)'
    : 'hsl(215.4 16.3% 46.9%)';

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: inactiveTint,
        drawerLabelStyle: {
          fontFamily: 'InstrumentSans-Medium',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Drawer.Screen name="Categories" component={CategoryTopTabsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
