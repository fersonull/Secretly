import Lucide from '@react-native-vector-icons/lucide';
import { View, Text, TextInput } from 'react-native';

export function GroupInput({ ...props }) {
  return (
    <>
      <Text className="text-sm font-sans-medium text-foreground dark:text-dark-foreground mb-2">
        {props.label}
      </Text>
      <View className="bg-background dark:bg-dark-background border border-input dark:border-dark-input rounded-md flex-row items-center px-3">
        <Lucide name={props.icon} size={20} color="hsl(215.4 16.3% 46.9%)" />
        <TextInput
          className={`flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans ${props.className}`}
          placeholder={props.placeholder}
          placeholderTextColor="hsl(215.4 16.3% 46.9%)"
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          autoCapitalize="none"
          autoComplete="email"
          {...props}
        />
      </View>
    </>
  );
}
