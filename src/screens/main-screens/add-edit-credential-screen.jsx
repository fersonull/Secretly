import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCredentialForm } from '../../hooks/use-credential-form';
import CredentialFormHeader from '../../components/credential/credential-form-header';
import CategorySelector from '../../components/credential/category-selector';
import FormInput from '../../components/credential/form-input';

export default function AddEditCredentialScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isEdit = !!route.params?.id;

  const {
    formData,
    updateField,
    showPassword,
    setShowPassword,
    generatePassword,
    validateForm,
  } = useCredentialForm();

  const handleSave = useCallback(() => {
    if (!validateForm()) return;

    // Save logic here
    Alert.alert('Success', 'Credential saved successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }, [validateForm, navigation]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const GenerateButton = useCallback(
    () => (
      <TouchableOpacity
        onPress={generatePassword}
        className="flex-row items-center"
      >
        <Lucide name="wand" size={16} color="#3B82F6" />
        <Text className="text-primary font-sans-medium text-sm ml-1">
          Generate
        </Text>
      </TouchableOpacity>
    ),
    [generatePassword]
  );

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <CredentialFormHeader
        isEdit={isEdit}
        onClose={handleClose}
        onSave={handleSave}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <FormInput
            label="Title"
            icon="file-text"
            value={formData.title}
            onChangeText={value => updateField('title', value)}
            placeholder="e.g., Facebook, Gmail"
            required
          />

          <CategorySelector
            selectedCategory={formData.category}
            onSelectCategory={value => updateField('category', value)}
          />

          <FormInput
            label="Username / Email"
            icon="user"
            value={formData.username}
            onChangeText={value => updateField('username', value)}
            placeholder="Enter username or email"
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />

          <FormInput
            label="Password"
            icon="lock"
            value={formData.password}
            onChangeText={value => updateField('password', value)}
            placeholder="Enter password"
            secureTextEntry
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            autoCapitalize="none"
            required
            rightAction={<GenerateButton />}
          />

          <FormInput
            label="Website URL"
            icon="globe"
            value={formData.url}
            onChangeText={value => updateField('url', value)}
            placeholder="https://example.com"
            keyboardType="url"
            autoCapitalize="none"
          />

          <FormInput
            label="Notes"
            value={formData.notes}
            onChangeText={value => updateField('notes', value)}
            placeholder="Add any additional notes..."
            multiline
          />

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
