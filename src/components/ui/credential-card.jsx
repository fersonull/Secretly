import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function CredentialCard({ item, onPress }) {
  const getCategoryIcon = category => {
    const icons = {
      social: 'share-2',
      banking: 'landmark',
      email: 'mail',
      shopping: 'shopping-cart',
      work: 'briefcase',
      other: 'key',
    };
    return icons[category] || 'key';
  };

  console.log(item);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background-card dark:bg-dark-background-card border border-border dark:border-dark-border rounded-lg p-4 mb-3"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 rounded-lg bg-background-muted dark:bg-dark-background-muted items-center justify-center mr-3">
            <Lucide
              name={getCategoryIcon(item.category)}
              size={20}
              color="#3B82F6"
            />
          </View>
          <View className="flex-1">
            <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-base">
              {item.title}
            </Text>
            <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
              {item.username}
            </Text>
          </View>
        </View>
        <Lucide name="chevron-right" size={20} color="#71717A" />
      </View>
      {item.url && (
        <Text
          className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans text-xs"
          numberOfLines={1}
        >
          {item.url}
        </Text>
      )}
    </TouchableOpacity>
  );
}
