import { View, Text } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function EmptyState({ searchQuery, selectedCategory }) {
  const isFiltered = searchQuery || selectedCategory !== 'all';

  return (
    <View className="flex-1 items-center justify-center py-12">
      <View className="w-20 h-20 rounded-full bg-background-muted dark:bg-dark-background-muted items-center justify-center mb-4">
        <Lucide name={isFiltered ? 'search-x' : 'key'} size={32} color="#71717A" />
      </View>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg mb-2">
        {isFiltered ? 'No credentials found' : 'No credentials yet'}
      </Text>
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm text-center px-8">
        {isFiltered
          ? 'Try adjusting your search or filters'
          : 'Add your first credential to get started'}
      </Text>
    </View>
  );
}
