import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useRef, useEffect } from 'react';

export default function IosSegmentedControl({ segments, selectedIndex, onIndexChange }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const segmentWidth = 100 / segments.length;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: selectedIndex,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View className="bg-background-secondary dark:bg-dark-background-secondary rounded-lg p-0.5 flex-row relative">
      <Animated.View
        className="absolute bg-background dark:bg-dark-background rounded-md shadow-sm"
        style={{
          width: `${segmentWidth}%`,
          height: '100%',
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: segments.map((_, i) => i),
                outputRange: segments.map((_, i) => i * (100 / segments.length)),
              }),
            },
          ],
        }}
      />
      {segments.map((segment, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onIndexChange(index)}
          className="flex-1 py-2 items-center justify-center z-10"
          activeOpacity={0.7}
        >
          <Text
            className={`font-sans-medium text-sm ${
              selectedIndex === index
                ? 'text-foreground dark:text-dark-foreground'
                : 'text-foreground-muted dark:text-dark-foreground-muted'
            }`}
          >
            {segment}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
