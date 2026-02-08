import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppHeader from '../components/common/app-header';
import CategorySocialScreen from '../screens/main-screens/category-social-screen';
import CategoryBankingScreen from '../screens/main-screens/category-banking-screen';
import CategoryEmailScreen from '../screens/main-screens/category-email-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTab = createMaterialTopTabNavigator();

export default function CategoryTopTabsNavigator() {
  const colorScheme = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <AppHeader title="Categories" />
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
          name="SocialMedia"
          component={CategorySocialScreen}
          options={{ title: 'Social Media' }}
        />
        <TopTab.Screen name="Banking" component={CategoryBankingScreen} />
        <TopTab.Screen name="Email" component={CategoryEmailScreen} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}
