import { View, Text } from 'react-native';

export default function WelcomeHeader({ userName = 'John' }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="px-4 pt-4 pb-2">
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
        {getGreeting()}
      </Text>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl">
        {userName}
      </Text>
    </View>
  );
}
