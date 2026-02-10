import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function IosActionSheet({
  visible,
  title,
  message,
  options = [],
  cancelText = 'Cancel',
  onClose,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <Pressable onPress={e => e.stopPropagation()}>
          <View className="px-2 pb-2">
            {/* Main Sheet */}
            <View className="bg-background dark:bg-dark-background rounded-2xl overflow-hidden mb-2">
              {/* Header */}
              {(title || message) && (
                <View className="py-4 px-4 border-b border-border dark:border-dark-border">
                  {title && (
                    <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-center text-xs mb-1">
                      {title}
                    </Text>
                  )}
                  {message && (
                    <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-center text-xs">
                      {message}
                    </Text>
                  )}
                </View>
              )}

              {/* Options */}
              <ScrollView style={{ maxHeight: 400 }}>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={option.onPress}
                    className={`py-4 px-4 ${
                      index < options.length - 1
                        ? 'border-b border-border dark:border-dark-border'
                        : ''
                    }`}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`text-center text-base ${
                        option.style === 'destructive'
                          ? 'text-danger font-sans-medium'
                          : 'text-primary font-sans'
                      }`}
                    >
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onClose}
              className="bg-background dark:bg-dark-background rounded-2xl py-4"
              activeOpacity={0.7}
            >
              <Text className="text-primary font-sans-bold text-center text-base">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
