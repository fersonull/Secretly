import { View, Text } from 'react-native';
import AppHeader from '../../components/common/app-header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategorySocialScreen() {
  return (
    <SafeAreaView className="bg-background flex-1">
      <AppHeader title="Social Media" />
      <View className="flex-1 items-center justify-center">
        <Text>Social Media</Text>
      </View>
    </SafeAreaView>
  );
}
