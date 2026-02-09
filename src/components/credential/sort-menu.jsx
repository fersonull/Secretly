import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

const SORT_OPTIONS = [
  { id: 'recent', label: 'Recently Updated', icon: 'clock' },
  { id: 'oldest', label: 'Oldest First', icon: 'clock-4' },
  { id: 'a-z', label: 'A to Z', icon: 'arrow-up-a-z' },
  { id: 'z-a', label: 'Z to A', icon: 'arrow-down-z-a' },
];

export default function SortMenu({ selected, onSelect }) {
  const selectedOption = SORT_OPTIONS.find(opt => opt.id === selected);

  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm">
        Sort by
      </Text>
      <View className="flex-row items-center gap-2">
        {SORT_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelect(option.id)}
            className={`flex-row items-center px-3 py-2 rounded-lg ${
              selected === option.id
                ? 'bg-primary'
                : 'bg-background-secondary dark:bg-dark-background-secondary'
            }`}
          >
            <Lucide
              name={option.icon}
              size={16}
              color={selected === option.id ? '#FFFFFF' : '#71717A'}
            />
            <Text
              className={`font-sans-medium text-xs ml-2 ${
                selected === option.id
                  ? 'text-white'
                  : 'text-foreground-muted dark:text-dark-foreground-muted'
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
