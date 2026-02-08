import { View, Text } from 'react-native';
import AppHeader from '../../components/common/app-header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView className="bg-background flex-1">
      <AppHeader title="Settings" />
      <View className="flex-1 items-center justify-center">
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  );
}
