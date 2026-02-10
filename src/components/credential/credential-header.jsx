import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCategories } from '../../hooks/use-categories';

export default function CredentialHeader({ credential, onBack, onEdit }) {
  const { categories } = useCategories();

  const getCategoryIcon = (category) => {
    const foundCategory = categories.find(cat => cat.id === category);
    return foundCategory?.icon || 'key';
  };

  const getCategoryLabel = (category) => {
    const foundCategory = categories.find(cat => cat.id === category);
    return foundCategory?.label || 'Other';
  };

  return (
    <View className="bg-background dark:bg-dark-background px-6 py-4 border-b border-border dark:border-dark-border">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={onBack} className="mr-4">
          <Lucide name="arrow-left" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit}>
          <Lucide name="edit" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-4">
        <View className="bg-background-muted dark:bg-dark-background-muted p-4 rounded-full mr-4">
          <Lucide
            name={getCategoryIcon(credential.category)}
            size={32}
            color="#6B7280"
          />
        </View>
        <View className="flex-1">
          <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl mb-1">
            {credential.title}
          </Text>
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-base">
            {getCategoryLabel(credential.category)}
          </Text>
        </View>
      </View>
    </View>
  );
}