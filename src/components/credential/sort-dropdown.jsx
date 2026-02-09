import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import Lucide from '@react-native-vector-icons/lucide';

const SORT_OPTIONS = [
  { id: 'recent', label: 'Recently Updated' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'a-z', label: 'A to Z' },
  { id: 'z-a', label: 'Z to A' },
];

export default function SortDropdown({ selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = SORT_OPTIONS.find(opt => opt.id === selected);

  const handleSelect = option => {
    onSelect(option.id);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="flex-row items-center bg-background-secondary dark:bg-dark-background-secondary px-3 py-2 rounded-lg border border-border dark:border-dark-border"
      >
        <Lucide name="arrow-up-down" size={16} color="#71717A" />
        <Text className="text-foreground dark:text-dark-foreground font-sans-medium text-sm ml-2 flex-1">
          {selectedOption?.label}
        </Text>
        <Lucide name="chevron-down" size={16} color="#71717A" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setIsOpen(false)}
        >
          <View className="flex-1 justify-center items-center px-4">
            <Pressable
              className="bg-background dark:bg-dark-background rounded-2xl overflow-hidden w-full max-w-sm"
              onPress={e => e.stopPropagation()}
            >
              {/* Header */}
              <View className="px-4 py-3 border-b border-border dark:border-dark-border">
                <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-center">
                  Sort By
                </Text>
              </View>

              {/* Options */}
              {SORT_OPTIONS.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelect(option)}
                  className={`flex-row items-center justify-between px-4 py-4 ${
                    index < SORT_OPTIONS.length - 1
                      ? 'border-b border-border dark:border-dark-border'
                      : ''
                  }`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`font-sans text-base ${
                      selected === option.id
                        ? 'text-primary font-sans-medium'
                        : 'text-foreground dark:text-dark-foreground'
                    }`}
                  >
                    {option.label}
                  </Text>
                  {selected === option.id && (
                    <Lucide name="check" size={20} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              ))}

              {/* Cancel Button */}
              <View className="border-t-8 border-background-secondary dark:border-dark-background-secondary">
                <TouchableOpacity
                  onPress={() => setIsOpen(false)}
                  className="px-4 py-4"
                  activeOpacity={0.7}
                >
                  <Text className="text-danger font-sans-medium text-base text-center">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
