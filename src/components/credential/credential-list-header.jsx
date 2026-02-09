import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function CredentialListHeader({ totalCount, onBack, onAdd }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-border dark:border-dark-border">
      <TouchableOpacity
        onPress={onBack}
        className="w-10 h-10 items-center justify-center"
      >
        <Lucide name="arrow-left" size={22} color="#3B82F6" />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
          All Credentials
        </Text>
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs">
          {totalCount} {totalCount === 1 ? 'item' : 'items'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onAdd}
        className="w-10 h-10 items-center justify-center"
      >
        <Lucide name="plus" size={22} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );
}
