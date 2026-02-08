import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppHeader from '../components/common/app-header';
import CategorySocialScreen from '../screens/main-screens/category-social-screen';
import CategoryBankingScreen from '../screens/main-screens/category-banking-screen';
import CategoryEmailScreen from '../screens/main-screens/category-email-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTab = createMaterialTopTabNavigator();

export default function CategoryTopTabsNavigator() {
  const theme = useTheme();
  const inactiveTint = theme.dark
    ? 'hsl(215 20.2% 65.1%)'
    : 'hsl(215.4 16.3% 46.9%)';

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <AppHeader title="Categories" />
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderBottomColor: theme.dark
              ? 'hsl(217.2 32.6% 17.5%)'
              : 'hsl(214.3 31.8% 91.4%)',
            borderBottomWidth: 1,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
            height: 3,
            borderRadius: 999,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: inactiveTint,
          tabBarPressColor: theme.dark
            ? 'hsl(217.2 32.6% 17.5%)'
            : 'hsl(210 40% 96.1%)',
          tabBarLabelStyle: {
            fontFamily: 'InstrumentSans-Medium',
            textTransform: 'capitalize',
          },
        }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
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
