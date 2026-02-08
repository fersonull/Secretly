import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategorySocialScreen from '../screens/main-screens/category-social-screen';
import CategoryBankingScreen from '../screens/main-screens/category-banking-screen';
import CategoryEmailScreen from '../screens/main-screens/category-email-screen';

const TopTab = createMaterialTopTabNavigator();

export default function CategoryTopTabsNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="SocialMedia" component={CategorySocialScreen} options={{ title: 'Social Media' }} />
      <TopTab.Screen name="Banking" component={CategoryBankingScreen} />
      <TopTab.Screen name="Email" component={CategoryEmailScreen} />
    </TopTab.Navigator>
  );
}
