import { View, Modal, ActivityIndicator, Text } from 'react-native';

export default function IosLoading({ visible, message = 'Loading...' }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-background dark:bg-dark-background rounded-2xl p-6 items-center min-w-[140px]">
          <ActivityIndicator size="large" color="#3B82F6" />
          {message && (
            <Text className="text-foreground dark:text-dark-foreground font-sans-medium text-sm mt-4">
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}
