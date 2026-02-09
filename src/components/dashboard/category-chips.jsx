import Lucide from '@react-native-vector-icons/lucide';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useCategories } from '../../hooks/use-categories';

export default function CategoryChips({ selected, onSelect, categoryCount }) {
  const { categories } = useCategories();
  // Add "All" option to the beginning of the categories list
  const allCategories = [
    { id: 'all', label: 'All', icon: 'grid-2x2' },
    ...categories,
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3"
      className="py-3 "
    >
      {allCategories.map(category => {
        const count =
          category.id === 'all' ? null : categoryCount[category.id] || 0;
        const isSelected = selected === category.id;

        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => onSelect(category.id)}
            className={`px-4 py-2.5 rounded-full flex-row items-center ${
              isSelected
                ? 'bg-primary'
                : 'bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border'
            }`}
            activeOpacity={0.7}
          >
            <Lucide
              name={category.icon}
              size={16}
              color={isSelected ? '#FFFFFF' : '#71717A'}
            />
            <Text
              className={`font-sans-medium text-sm ml-2 ${
                isSelected
                  ? 'text-white'
                  : 'text-foreground dark:text-dark-foreground'
              }`}
            >
              {category.label}
              {count !== null && ` (${count})`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
