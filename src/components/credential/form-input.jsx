import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function FormInput({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPasswordToggle = false,
  showPassword,
  onTogglePassword,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  required = false,
  rightAction,
  ...props
}) {
  return (
    <View className="mb-4" {...props}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm">
          {label} {required && '*'}
        </Text>
        {rightAction}
      </View>
      <View
        className={`bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3 ${
          multiline ? '' : 'min-h-[52px]'
        }`}
      >
        {icon && <Lucide name={icon} size={20} color="#71717A" />}
        <TextInput
          className={`flex-1 ${icon ? 'px-3' : ''} ${
            multiline ? 'py-3 min-h-[100px]' : 'py-3'
          } text-foreground dark:text-dark-foreground font-sans`}
          placeholder={placeholder}
          placeholderTextColor="#71717A"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword} className="p-1">
            <Lucide
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#71717A"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
