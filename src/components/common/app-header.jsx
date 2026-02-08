import { Pressable, Text, View } from 'react-native';
import {
  useNavigation,
  DrawerActions,
  useTheme,
} from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';

export default function AppHeader({ title }) {
  const navigation = useNavigation();
  const colorScheme = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center px-4 py-3 bg-background dark:bg-dark-background border-b border-border dark:border-dark-border">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open navigation menu"
        accessibilityHint="Opens the navigation drawer"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        className="w-10 h-10 items-center justify-center"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <Lucide name="menu" size={22} color="#0EA5E9" />
      </Pressable>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg ml-2">
        {title}
      </Text>
    </View>
  );
}
