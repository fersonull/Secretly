import { View, Text } from 'react-native';

export function Divider() {
  return (
    <View className="flex-row items-center mb-4">
      <View className="flex-1 h-px bg-border dark:bg-dark-border" />
      <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans text-sm px-4">
        or
      </Text>
      <View className="flex-1 h-px bg-border dark:bg-dark-border" />
    </View>
  );
}
