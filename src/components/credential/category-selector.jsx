import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import { useCategories } from '../../hooks/use-categories';

export default function CategorySelector({ selectedCategory, onSelectCategory, onAddCategory, refreshKey }) {
  const { categories, refresh } = useCategories();

  // Force refresh when refreshKey changes
  useEffect(() => {
    if (refreshKey) {
      refresh();
    }
  }, [refreshKey, refresh]);

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
        {categories.map(cat => (
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
        
        {/* Add Custom Category Button */}
        <TouchableOpacity
          onPress={onAddCategory}
          className="flex-row items-center px-4 py-3 rounded-lg border border-dashed border-primary bg-primary/10"
        >
          <Lucide name="plus" size={16} color="#3B82F6" />
          <Text className="text-primary font-sans-medium text-sm ml-2">
            Add Custom
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
