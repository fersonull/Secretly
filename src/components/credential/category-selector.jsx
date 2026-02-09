import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

const CATEGORIES = [
  { id: 'social', label: 'Social Media', icon: 'share-2' },
  { id: 'banking', label: 'Banking', icon: 'landmark' },
  { id: 'email', label: 'Email', icon: 'mail' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-cart' },
  { id: 'work', label: 'Work', icon: 'briefcase' },
  { id: 'other', label: 'Other', icon: 'key' },
];

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <View className="mb-4">
      <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
        Category
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelectCategory(cat.id)}
            className={`flex-row items-center px-4 py-3 rounded-lg border ${
              selectedCategory === cat.id
                ? 'bg-primary border-primary'
                : 'bg-background-secondary dark:bg-dark-background-secondary border-border dark:border-dark-border'
            }`}
          >
            <Lucide
              name={cat.icon}
              size={16}
              color={selectedCategory === cat.id ? '#FFFFFF' : '#71717A'}
            />
            <Text
              className={`font-sans-medium text-sm ml-2 ${
                selectedCategory === cat.id
                  ? 'text-white'
                  : 'text-foreground dark:text-dark-foreground'
              }`}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
