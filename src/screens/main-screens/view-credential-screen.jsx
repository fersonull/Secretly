import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_CREDENTIAL = {
  id: '1',
  title: 'Facebook',
  username: 'john.doe@email.com',
  password: 'SuperSecret123!@#',
  category: 'social',
  url: 'https://facebook.com',
  notes: 'Personal Facebook account. Used for keeping in touch with family and friends.',
  createdAt: '2024-01-15',
  updatedAt: '2024-02-01',
};

export default function ViewCredentialScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text, label) => {
    // In production, use Clipboard.setString(text)
    Alert.alert('Copied', `${label} copied to clipboard`);
  };

  const handleEdit = () => {
    navigation.navigate('AddEditCredential', { id: MOCK_CREDENTIAL.id });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Credential',
      'Are you sure you want to delete this credential? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete logic here
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      {/* Custom Header with Actions */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border dark:border-dark-border">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center"
        >
          <Lucide name="arrow-left" size={22} color="#3B82F6" />
        </TouchableOpacity>
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
          Credential Details
        </Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={handleEdit}
            className="w-10 h-10 items-center justify-center"
          >
            <Lucide name="edit-2" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="w-10 h-10 items-center justify-center ml-2"
          >
            <Lucide name="trash-2" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Icon and Title */}
        <View className="items-center py-6 border-b border-border dark:border-dark-border">
          <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-3">
            <Lucide name="share-2" size={28} color="#3B82F6" />
          </View>
          <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl mb-1">
            {MOCK_CREDENTIAL.title}
          </Text>
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
            {MOCK_CREDENTIAL.category.charAt(0).toUpperCase() + MOCK_CREDENTIAL.category.slice(1)}
          </Text>
        </View>

        {/* Credential Fields */}
        <View className="p-4">
          {/* Username */}
          <View className="mb-4">
            <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
              USERNAME / EMAIL
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-between">
              <Text className="text-foreground dark:text-dark-foreground font-sans-medium flex-1">
                {MOCK_CREDENTIAL.username}
              </Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(MOCK_CREDENTIAL.username, 'Username')}
                className="ml-3"
              >
                <Lucide name="copy" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
              PASSWORD
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-between">
              <Text className="text-foreground dark:text-dark-foreground font-sans-medium flex-1">
                {showPassword ? MOCK_CREDENTIAL.password : '••••••••••••'}
              </Text>
              <View className="flex-row items-center ml-3">
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="mr-3"
                >
                  <Lucide
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color="#71717A"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => copyToClipboard(MOCK_CREDENTIAL.password, 'Password')}
                >
                  <Lucide name="copy" size={18} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* URL */}
          {MOCK_CREDENTIAL.url && (
            <View className="mb-4">
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
                WEBSITE URL
              </Text>
              <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-between">
                <Text className="text-primary dark:text-primary font-sans-medium flex-1">
                  {MOCK_CREDENTIAL.url}
                </Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(MOCK_CREDENTIAL.url, 'URL')}
                  className="ml-3"
                >
                  <Lucide name="external-link" size={18} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Notes */}
          {MOCK_CREDENTIAL.notes && (
            <View className="mb-4">
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
                NOTES
              </Text>
              <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4">
                <Text className="text-foreground dark:text-dark-foreground font-sans leading-5">
                  {MOCK_CREDENTIAL.notes}
                </Text>
              </View>
            </View>
          )}

          {/* Metadata */}
          <View className="bg-background-secondary dark:bg-dark-background-secondary rounded-lg p-4 mt-2">
            <View className="flex-row items-center mb-2">
              <Lucide name="calendar" size={16} color="#71717A" />
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm ml-2">
                Created: {MOCK_CREDENTIAL.createdAt}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Lucide name="clock" size={16} color="#71717A" />
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm ml-2">
                Last updated: {MOCK_CREDENTIAL.updatedAt}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
