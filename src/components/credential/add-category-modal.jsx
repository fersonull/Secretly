import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import IosBottomSheet from '../ui/ios-bottom-sheet';

const ICON_OPTIONS = [
  'folder',
  'heart',
  'star',
  'bookmark',
  'gift',
  'home',
  'music',
  'camera',
  'book',
  'gamepad-2',
  'coffee',
  'plane',
];

export default function AddCategoryModal({ visible, onClose, onAdd }) {
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');

  const handleAdd = () => {
    if (categoryName.trim()) {
      onAdd(categoryName.trim(), selectedIcon);
      setCategoryName('');
      setSelectedIcon('folder');
    }
  };

  return (
    <IosBottomSheet visible={visible} onClose={onClose} height={500}>
      <View className="px-6 py-4">
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-xl mb-1">
          Add Custom Category
        </Text>
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm mb-6">
          Create your own category for organizing credentials
        </Text>

        {/* Category Name */}
        <View className="mb-6">
          <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
            Category Name
          </Text>
          <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
            <Lucide name="tag" size={20} color="#71717A" />
            <TextInput
              className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
              placeholder="e.g., Gaming, Travel, Medical"
              placeholderTextColor="#71717A"
              value={categoryName}
              onChangeText={setCategoryName}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Icon Selector */}
        <View className="mb-6">
          <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-3">
            Choose Icon
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {ICON_OPTIONS.map(icon => (
              <TouchableOpacity
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                className={`w-12 h-12 rounded-lg items-center justify-center ${
                  selectedIcon === icon
                    ? 'bg-primary'
                    : 'bg-background-secondary dark:bg-dark-background-secondary'
                }`}
              >
                <Lucide
                  name={icon}
                  size={20}
                  color={selectedIcon === icon ? '#FFFFFF' : '#71717A'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 bg-background-secondary dark:bg-dark-background-secondary rounded-lg py-3 items-center border border-border dark:border-dark-border"
          >
            <Text className="text-foreground dark:text-dark-foreground font-sans-medium text-base">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAdd}
            className="flex-1 bg-primary rounded-lg py-3 items-center"
            disabled={!categoryName.trim()}
            style={{ opacity: categoryName.trim() ? 1 : 0.5 }}
          >
            <Text className="text-white font-sans-medium text-base">Add Category</Text>
          </TouchableOpacity>
        </View>
      </View>
    </IosBottomSheet>
  );
}
