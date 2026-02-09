import { View, Text } from 'react-native';

const VARIANTS = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  secondary: 'bg-background-secondary dark:bg-dark-background-secondary',
};

export default function IosBadge({ children, variant = 'primary', size = 'sm' }) {
  const sizeClass = size === 'xs' ? 'px-2 py-0.5' : 'px-2.5 py-1';
  const textClass = size === 'xs' ? 'text-xs' : 'text-sm';

  return (
    <View className={`${VARIANTS[variant]} rounded-full ${sizeClass}`}>
      <Text
        className={`${
          variant === 'secondary'
            ? 'text-foreground dark:text-dark-foreground'
            : 'text-white'
        } font-sans-medium ${textClass}`}
      >
        {children}
      </Text>
    </View>
  );
}
