import Lucide from '@react-native-vector-icons/lucide';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'grid-2x2' },
  { id: 'social', label: 'Social', icon: 'share-2' },
  { id: 'banking', label: 'Banking', icon: 'landmark' },
  { id: 'email', label: 'Email', icon: 'mail' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-cart' },
  { id: 'work', label: 'Work', icon: 'briefcase' },
  { id: 'other', label: 'Other', icon: 'key' },
];

export default function CategoryChips({ selected, onSelect, categoryCount }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      className="py-3"
    >
      {CATEGORIES.map(category => {
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
