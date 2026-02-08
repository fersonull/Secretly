import { View, Text } from 'react-native';
import AppHeader from '../../components/common/app-header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryBankingScreen() {
  return (
    <SafeAreaView className="bg-background flex-1">
      <AppHeader title="Banking" />
      <View className="flex-1 items-center justify-center">
        <Text>Banking</Text>
      </View>
    </SafeAreaView>
  );
}
