import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import Lucide from '@react-native-vector-icons/lucide';

const ICONS = {
  success: { name: 'circle-check', color: '#10B981' },
  error: { name: 'circle-x', color: '#EF4444' },
  warning: { name: 'circle-alert', color: '#F59E0B' },
  info: { name: 'info', color: '#3B82F6' },
};

export default function IosToast({
  visible,
  type = 'success',
  message,
  duration = 3000,
  onHide,
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      // Reset animation values
      opacity.setValue(0);
      translateY.setValue(-20);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -20,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onHide) onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Reset animation values when not visible
      opacity.setValue(0);
      translateY.setValue(-20);
    }
  }, [visible, duration, opacity, translateY, onHide]);

  if (!visible) return null;

  const icon = ICONS[type] || ICONS.info;

  return (
    <Animated.View
      className="absolute top-12 left-4 right-4 z-50"
      style={{ opacity, transform: [{ translateY }] }}
    >
      <View className="bg-background dark:bg-dark-background rounded-2xl shadow-lg border border-border dark:border-dark-border p-4 flex-row items-center">
        <Lucide name={icon.name} size={24} color={icon.color} />
        <Text className="text-foreground dark:text-dark-foreground font-sans-medium text-sm ml-3 flex-1">
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
