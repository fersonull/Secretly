import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: 'social', label: 'Social Media', icon: 'share-2' },
  { id: 'banking', label: 'Banking', icon: 'landmark' },
  { id: 'email', label: 'Email', icon: 'mail' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-cart' },
  { id: 'work', label: 'Work', icon: 'briefcase' },
  { id: 'other', label: 'Other', icon: 'key' },
];

export default function AddEditCredentialScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isEdit = route.params?.id;

  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('other');
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let generatedPassword = '';
    for (let i = 0; i < 16; i++) {
      generatedPassword += chars.charAt(
        Math.floor(Math.random() * chars.length),
      );
    }
    setPassword(generatedPassword);
    Alert.alert('Password Generated', 'A strong password has been generated');
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return;
    }
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Please enter a username or email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Please enter a password');
      return;
    }

    // Save logic here
    Alert.alert('Success', 'Credential saved successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border dark:border-dark-border">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center"
        >
          <Lucide name="x" size={22} color="#71717A" />
        </TouchableOpacity>
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
          {isEdit ? 'Edit Credential' : 'Add Credential'}
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          className="bg-primary px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-sans-medium text-sm">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* Title */}
          <View className="mb-4">
            <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
              Title *
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
              <Lucide name="file-text" size={20} color="#71717A" />
              <TextInput
                className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
                placeholder="e.g., Facebook, Gmail"
                placeholderTextColor="#71717A"
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Category Selector */}
          <View className="mb-4">
            <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
              Category
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setCategory(cat.id)}
                  className={`flex-row items-center px-4 py-3 rounded-lg border ${
                    category === cat.id
                      ? 'bg-primary border-primary'
                      : 'bg-background-secondary dark:bg-dark-background-secondary border-border dark:border-dark-border'
                  }`}
                >
                  <Lucide
                    name={cat.icon}
                    size={16}
                    color={category === cat.id ? '#FFFFFF' : '#71717A'}
                  />
                  <Text
                    className={`font-sans-medium text-sm ml-2 ${
                      category === cat.id
                        ? 'text-white'
                        : 'text-foreground dark:text-dark-foreground'
                    }`}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Username/Email */}
          <View className="mb-4">
            <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
              Username / Email *
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
              <Lucide name="user" size={20} color="#71717A" />
              <TextInput
                className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
                placeholder="Enter username or email"
                placeholderTextColor="#71717A"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm">
                Password *
              </Text>
              <TouchableOpacity
                onPress={generatePassword}
                className="flex-row items-center"
              >
                <Lucide name="wand" size={16} color="#3B82F6" />
                <Text className="text-primary font-sans-medium text-sm ml-1">
                  Generate
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
              <Lucide name="lock" size={20} color="#71717A" />
              <TextInput
                className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
                placeholder="Enter password"
                placeholderTextColor="#71717A"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                <Lucide
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#71717A"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* URL */}
          <View className="mb-4">
            <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
              Website URL
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
              <Lucide name="globe" size={20} color="#71717A" />
              <TextInput
                className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
                placeholder="https://example.com"
                placeholderTextColor="#71717A"
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>
          </View>

          {/* Notes */}
          <View className="mb-6">
            <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm mb-2">
              Notes
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-3">
              <TextInput
                className="text-foreground dark:text-dark-foreground font-sans min-h-[100px]"
                placeholder="Add any additional notes..."
                placeholderTextColor="#71717A"
                value={notes}
                onChangeText={setNotes}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Info Card */}
          <View className="bg-background-secondary dark:bg-dark-background-secondary rounded-lg p-4 flex-row">
            <Lucide name="shield-check" size={20} color="#3B82F6" />
            <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm ml-3 flex-1 leading-5">
              Your credentials are encrypted end-to-end and stored securely.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
