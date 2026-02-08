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
            backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
            borderBottomColor: isDark ? '#262626' : '#E5E7EB',
            borderBottomWidth: 1,
            elevation: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#0EA5E9',
            height: 2,
          },
          tabBarActiveTintColor: '#0EA5E9',
          tabBarInactiveTintColor: isDark ? '#A1A1AA' : '#6B7280',
          tabBarPressColor: isDark ? '#262626' : '#F9FAFB',
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
          backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
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
