import { Pressable, Text, View } from 'react-native';
import { useNavigation, DrawerActions, useTheme } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';

export default function AppHeader({ title }) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View className="flex-row items-center px-4 py-3 bg-background dark:bg-dark-background border-b border-border dark:border-dark-border">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open navigation menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        className="w-10 h-10 items-center justify-center rounded-full"
      >
        <Lucide name="menu" size={22} color={theme.colors.primary} />
      </Pressable>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg ml-2">
        {title}
      </Text>
    </View>
  );
}
