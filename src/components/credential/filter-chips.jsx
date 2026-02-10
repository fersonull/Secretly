import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useCategories } from '../../hooks/use-categories';

export default function FilterChips({ selected, onSelect, categoryCount }) {
  const { categories } = useCategories();
  
  // Add "All" option to the beginning of the categories list
  const filterOptions = [
    { id: 'all', label: 'All' },
    ...categories,
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
    >
      {filterOptions.map(option => {
        const count =
          option.id === 'all' ? null : categoryCount[option.id] || 0;
        const isSelected = selected === option.id;

        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelect(option.id)}
            className={`px-4 py-2 rounded-full border ${
              isSelected
                ? 'bg-primary border-primary'
                : 'bg-background-secondary dark:bg-dark-background-secondary border-border dark:border-dark-border'
            }`}
          >
            <Text
              className={`font-sans-medium text-sm ${
                isSelected
                  ? 'text-white'
                  : 'text-foreground dark:text-dark-foreground'
              }`}
            >
              {option.label}
              {count !== null && ` (${count})`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
