import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppHeader from '../components/common/app-header';
import FavoritesScreen from '../screens/main-screens/favorites-screen';
import RecentScreen from '../screens/main-screens/recent-screen';
import WeakPasswordsScreen from '../screens/main-screens/weak-passwords-screen';
import DuplicatesScreen from '../screens/main-screens/duplicates-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTab = createMaterialTopTabNavigator();

export default function CategoryTopTabsNavigator() {
  const theme = useTheme();
  const isDark = theme.dark;

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <AppHeader title="Organize" />
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderBottomColor: isDark ? '#3F3F46' : '#E4E4E7',
            borderBottomWidth: 1,
            elevation: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#3B82F6',
            height: 2,
          },
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: isDark ? '#A1A1AA' : '#71717A',
          tabBarPressColor: isDark ? '#3F3F46' : '#FAFAFA',
          tabBarLabelStyle: {
            fontFamily: 'InstrumentSans-Medium',
            textTransform: 'none',
            letterSpacing: 0.2,
            fontSize: 14,
          },
          tabBarItemStyle: {
            paddingVertical: 6,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: isDark ? '#27272A' : '#FFFFFF',
        }}
      >
        <TopTab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favorites' }}
        />
        <TopTab.Screen 
          name="Recent" 
          component={RecentScreen}
          options={{ title: 'Recent' }}
        />
        <TopTab.Screen 
          name="WeakPasswords" 
          component={WeakPasswordsScreen}
          options={{ title: 'Weak' }}
        />
        <TopTab.Screen 
          name="Duplicates" 
          component={DuplicatesScreen}
          options={{ title: 'Duplicates' }}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}
