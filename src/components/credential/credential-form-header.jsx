import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function CredentialFormHeader({ isEdit, onClose, onSave }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-border dark:border-dark-border">
      <TouchableOpacity
        onPress={onClose}
        className="w-10 h-10 items-center justify-center"
      >
        <Lucide name="x" size={22} color="#71717A" />
      </TouchableOpacity>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
        {isEdit ? 'Edit Credential' : 'Add Credential'}
      </Text>
      <TouchableOpacity
        onPress={onSave}
        className="bg-primary px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-sans-medium text-sm">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
