import { ScrollView, TouchableOpacity, Text } from 'react-native';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'social', label: 'Social' },
  { id: 'banking', label: 'Banking' },
  { id: 'email', label: 'Email' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'work', label: 'Work' },
  { id: 'other', label: 'Other' },
];

export default function FilterChips({ selected, onSelect, categoryCount }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
    >
      {FILTER_OPTIONS.map(option => {
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
