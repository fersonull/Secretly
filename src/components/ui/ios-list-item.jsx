import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function IosListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon = 'chevron-right',
  rightText,
  onPress,
  showChevron = true,
}) {
  const Content = (
    <View className="flex-row items-center px-4 py-3 bg-background dark:bg-dark-background border-b border-border dark:border-dark-border">
      {leftIcon && (
        <View className="w-8 h-8 items-center justify-center mr-3">
          <Lucide name={leftIcon} size={20} color="#3B82F6" />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-foreground dark:text-dark-foreground font-sans text-base">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm mt-0.5">
            {subtitle}
          </Text>
        )}
      </View>
      {rightText && (
        <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans text-sm mr-2">
          {rightText}
        </Text>
      )}
      {showChevron && <Lucide name={rightIcon} size={18} color="#71717A" />}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
}
