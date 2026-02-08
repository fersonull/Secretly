import { View, Text } from 'react-native';
import AppHeader from '../../components/common/app-header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CredentialListScreen() {
  return (
    <SafeAreaView className="bg-background flex-1">
      <AppHeader title="Credential List" />
      <View className="flex-1 items-center justify-center">
        <Text>Credential List</Text>
      </View>
    </SafeAreaView>
  );
}
