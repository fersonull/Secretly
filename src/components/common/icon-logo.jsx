import { View } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { useTheme } from '@react-navigation/native';

export function IconLogo() {
  const theme = useTheme();

  return (
    <View className="bg-primary dark:bg-dark-primary w-20 h-20 rounded-2xl items-center justify-center mb-4">
      <Lucide
        name="folder-lock"
        size={40}
        color={theme.dark ? 'hsl(210, 0%, 100%)' : 'hsl(210 40% 98%)'}
        // color="hsl(215.4 16.3% 46.9%)"
      />
    </View>
  );
}
