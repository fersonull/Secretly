import { View, Modal, Pressable, Animated, PanResponder, Dimensions } from 'react-native';
import { useRef, useEffect } from 'react';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function IosBottomSheet({ visible, onClose, children, height = 'auto' }) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openSheet = () => {
    Animated.spring(translateY, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      openSheet();
    } else {
      translateY.setValue(SCREEN_HEIGHT);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable className="flex-1 bg-black/40" onPress={closeSheet}>
        <Pressable onPress={e => e.stopPropagation()}>
          <Animated.View
            style={{
              transform: [{ translateY }],
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: height === 'auto' ? 'auto' : height,
            }}
            className="bg-background dark:bg-dark-background rounded-t-3xl overflow-hidden"
          >
            <View {...panResponder.panHandlers} className="items-center py-2">
              <View className="w-10 h-1 rounded-full bg-foreground-muted dark:bg-dark-foreground-muted opacity-30" />
            </View>
            {children}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
