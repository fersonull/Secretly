import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';

export default function IosAlert({
  visible,
  title,
  message,
  buttons = [],
  onClose,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable className="flex-1 bg-black/40 justify-center items-center px-8" onPress={onClose}>
        <Pressable
          className="bg-background dark:bg-dark-background rounded-2xl overflow-hidden w-full max-w-sm"
          onPress={e => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <View className="pt-5 px-4">
              <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-center text-lg">
                {title}
              </Text>
            </View>
          )}

          {/* Message */}
          {message && (
            <View className="pt-3 pb-5 px-4">
              <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans text-center text-sm leading-5">
                {message}
              </Text>
            </View>
          )}

          {/* Buttons */}
          <View className="border-t border-border dark:border-dark-border">
            {buttons.length === 1 ? (
              <TouchableOpacity
                onPress={buttons[0].onPress}
                className="py-3"
                activeOpacity={0.7}
              >
                <Text
                  className={`text-center font-sans-medium text-base ${
                    buttons[0].style === 'destructive'
                      ? 'text-danger'
                      : 'text-primary'
                  }`}
                >
                  {buttons[0].text}
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="flex-row">
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={button.onPress}
                    className={`flex-1 py-3 ${
                      index < buttons.length - 1
                        ? 'border-r border-border dark:border-dark-border'
                        : ''
                    }`}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`text-center text-base ${
                        button.style === 'destructive'
                          ? 'text-danger font-sans-medium'
                          : button.style === 'cancel'
                          ? 'text-foreground-secondary dark:text-dark-foreground-secondary font-sans'
                          : 'text-primary font-sans-medium'
                      }`}
                    >
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
