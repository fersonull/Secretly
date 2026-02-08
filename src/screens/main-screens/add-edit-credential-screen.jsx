import { View, Text } from 'react-native';
import AppHeader from '../../components/common/app-header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddEditCredentialScreen() {
  return (
    <SafeAreaView className="bg-background flex-1">
      <AppHeader title="Add / Edit Credential" />
      <View className="flex-1 items-center justify-center">
        <Text>Add / Edit Credential</Text>
      </View>
    </SafeAreaView>
  );
}
