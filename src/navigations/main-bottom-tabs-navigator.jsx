import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import DashboardScreen from '../screens/main-screens/dashboard-screen';
import FavoritesScreen from '../screens/main-screens/favorites-screen';
import RecentScreen from '../screens/main-screens/recent-screen';
import WeakPasswordsScreen from '../screens/main-screens/weak-passwords-screen';
import AppHeader from '../components/common/app-header';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const ScreenWrapper = ({ children, title }) => (
  <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
    <AppHeader title={title} />
    {children}
  </SafeAreaView>
);

export default function MainBottomTabsNavigator() {
  const theme = useTheme();
  const isDark = theme.dark;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'layout-dashboard';
              break;
            case 'Favorites':
              iconName = 'heart';
              break;
            case 'Recent':
              iconName = 'clock';
              break;
            case 'WeakPasswords':
              iconName = 'shield-alert';
              break;
            default:
              iconName = 'circle';
          }

          return <Lucide name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: isDark ? '#71717A' : '#9CA3AF',
        tabBarStyle: {
          backgroundColor: isDark ? '#1F1F23' : '#FFFFFF',
          borderTopColor: isDark ? '#27272A' : '#E4E4E7',
          paddingTop: 6,
          paddingBottom: 12,
          height: 70,
        },
        tabBarLabelStyle: {
          fontFamily: 'InstrumentSans-Medium',
          fontSize: 11,
          marginTop: 2,
          marginBottom: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          justifyContent: 'center',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        options={{
          tabBarLabel: 'Favorites',
        }}
      >
        {() => (
          <ScreenWrapper title="Favorites">
            <FavoritesScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen 
        name="Recent" 
        options={{
          tabBarLabel: 'Recent',
        }}
      >
        {() => (
          <ScreenWrapper title="Recent">
            <RecentScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen 
        name="WeakPasswords" 
        options={{
          tabBarLabel: 'Security',
        }}
      >
        {() => (
          <ScreenWrapper title="Weak Passwords">
            <WeakPasswordsScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}