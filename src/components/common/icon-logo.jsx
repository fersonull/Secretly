import { View } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export function IconLogo() {
  return (
    <View className="bg-primary dark:bg-dark-primary w-20 h-20 rounded-2xl items-center justify-center mb-4">
      <Lucide name="folder-lock" size={40} color="hsl(210 40% 98%)" />
    </View>
  );
}
