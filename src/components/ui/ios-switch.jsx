import { TouchableOpacity, Animated, View } from 'react-native';
import { useRef, useEffect } from 'react';

export default function IosSwitch({ value, onValueChange, disabled = false }) {
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;
  const backgroundColor = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 20 : 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E4E4E7', '#3B82F6'],
  });

  return (
    <TouchableOpacity
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.8}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        className="w-12 h-7 rounded-full justify-center px-0.5"
        style={{ backgroundColor: bgColor }}
      >
        <Animated.View
          className="w-6 h-6 rounded-full bg-white shadow-sm"
          style={{ transform: [{ translateX }] }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
