import { View, TextInput } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function SearchBar({ value, onChangeText, placeholder = 'Search...' }) {
  return (
    <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
      <Lucide name="search" size={20} color="#71717A" />
      <TextInput
        className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
        placeholder={placeholder}
        placeholderTextColor="#71717A"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
