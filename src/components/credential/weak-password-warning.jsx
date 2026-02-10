import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function WeakPasswordWarning({ credential, onEdit }) {
  return (
    <View className="mb-6 bg-danger/10 border border-danger/20 rounded-lg p-4">
      <View className="flex-row items-center mb-2">
        <Lucide name="shield-alert" size={20} color="#EF4444" />
        <Text className="text-danger font-sans-bold text-base ml-2">
          Weak Password Detected
        </Text>
      </View>
      <Text className="text-danger/80 font-sans text-sm mb-3">
        This password is weak and may be easily guessed. Consider updating it
        with a stronger password that includes:
      </Text>
      <View className="mb-3">
        <Text className="text-danger/70 font-sans text-sm">
          • At least 12 characters
        </Text>
        <Text className="text-danger/70 font-sans text-sm">
          • Mix of uppercase and lowercase letters
        </Text>
        <Text className="text-danger/70 font-sans text-sm">
          • Numbers and special characters
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onEdit?.(credential)}
        className="bg-danger rounded-lg p-3 flex-row items-center justify-center"
        activeOpacity={0.8}
      >
        <Lucide name="square-pen" size={16} color="#FFFFFF" />
        <Text className="text-white font-sans-medium text-sm ml-2">
          Update Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
