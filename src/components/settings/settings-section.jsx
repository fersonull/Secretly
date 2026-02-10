import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsSection({ title, children, className }) {
  return (
    <View className={`mb-6 ${className || ''}`}>
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans-bold text-sm uppercase tracking-wide mb-3 px-6">
        {title}
      </Text>
      <View className="bg-background-card dark:bg-dark-background-card mx-4 rounded-lg overflow-hidden">
        {children}
      </View>
    </View>
  );
}