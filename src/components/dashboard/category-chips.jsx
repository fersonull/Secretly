import { ScrollView, TouchableOpacity, Text } from 'react-native';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '📦' },
  { id: 'social', label: 'Social', icon: '👥' },
  { id: 'banking', label: 'Banking', icon: '🏦' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'other', label: 'Other', icon: '🔑' },
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
        const count = category.id === 'all' ? null : categoryCount[category.id] || 0;
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
            <Text className="text-base mr-1.5">{category.icon}</Text>
            <Text
              className={`font-sans-medium text-sm ${
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
