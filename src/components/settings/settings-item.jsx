import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function SettingsItem({ 
  title, 
  subtitle, 
  icon, 
  onPress, 
  rightElement, 
  destructive = false,
  showChevron = true,
  isLast = false 
}) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center px-4 py-4 ${!isLast ? 'border-b border-border dark:border-dark-border' : ''}`}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {icon && (
        <View className="mr-3">
          <Lucide 
            name={icon} 
            size={22} 
            color={destructive ? '#EF4444' : '#6B7280'} 
          />
        </View>
      )}
      
      <View className="flex-1">
        <Text className={`font-sans-medium text-base ${destructive ? 'text-danger' : 'text-foreground dark:text-dark-foreground'}`}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm mt-1">
            {subtitle}
          </Text>
        )}
      </View>
      
      {rightElement && (
        <View className="mr-2">
          {rightElement}
        </View>
      )}
      
      {showChevron && onPress && (
        <Lucide 
          name="chevron-right" 
          size={20} 
          color="#6B7280" 
        />
      )}
    </TouchableOpacity>
  );
}