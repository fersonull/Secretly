import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCredentialForm } from '../../hooks/use-credential-form';
import { useCredentials } from '../../hooks/use-credentials';
import { useCategories } from '../../hooks/use-categories';
import CredentialFormHeader from '../../components/credential/credential-form-header';
import CategorySelector from '../../components/credential/category-selector';
import FormInput from '../../components/credential/form-input';
import PasswordStrengthMeter from '../../components/ui/password-strength-meter';
import AddCategoryModal from '../../components/credential/add-category-modal';
import IosAlert from '../../components/ui/ios-alert';
import IosLoading from '../../components/ui/ios-loading';
import { useToast } from '../../hooks/use-toast';
import { useAlert } from '../../hooks/use-alert';
import { calculatePasswordStrength } from '../../utils/password-strength';

export default function AddEditCredentialScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isEdit = !!route.params?.id;
  const credentialId = route.params?.id;
  
  const [showUrlField, setShowUrlField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);
  const { showToast } = useToast();
  const { alert, showAlert, hideAlert } = useAlert();
  const { addCredential, updateCredential, getCredentialById } = useCredentials();
  const { addCategory, refresh: refreshCategories } = useCategories();

  const {
    formData,
    updateField,
    showPassword,
    setShowPassword,
    generatePassword,
    validateForm,
  } = useCredentialForm();

  useEffect(() => {
    if (isEdit && credentialId) {
      const credential = getCredentialById(credentialId);
      if (credential) {
        updateField('title', credential.title);
        updateField('username', credential.username);
        updateField('password', credential.password);
        updateField('url', credential.url || '');
        updateField('notes', credential.notes || '');
        updateField('category', credential.category);
        if (credential.url) setShowUrlField(true);
      }
    }
  }, [isEdit, credentialId, getCredentialById]);

  const handleSave = useCallback(async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      showAlert('Validation Error', validation.error, [
        { text: 'OK', onPress: hideAlert },
      ]);
      return;
    }

    setIsLoading(true);
    
    const passwordStrengthInfo = calculatePasswordStrength(formData.password);
    const credentialData = {
      title: formData.title,
      username: formData.username,
      password: formData.password,
      url: formData.url,
      notes: formData.notes,
      category: formData.category,
      passwordStrength: passwordStrengthInfo.strength,
    };

    const result = isEdit
      ? await updateCredential(credentialId, credentialData)
      : await addCredential(credentialData);
    
    setIsLoading(false);

    if (result.success) {
      navigation.goBack();
      showToast('success', `Credential ${isEdit ? 'updated' : 'added'} successfully!`);
    } else {
      showAlert('Error', result.error || 'Failed to save credential', [
        { text: 'OK', onPress: hideAlert },
      ]);
    }
  }, [validateForm, formData, isEdit, credentialId, addCredential, updateCredential, navigation, showToast, showAlert, hideAlert]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddCategory = useCallback(async (categoryName, icon) => {
    const result = await addCategory(categoryName, icon);
    
    if (result.success) {
      setShowCategoryModal(false);
      // Force refresh categories to ensure immediate UI update
      await refreshCategories();
      // Trigger CategorySelector refresh
      setCategoryRefreshKey(prev => prev + 1);
      updateField('category', result.category.id);
      showToast('success', 'Custom category added successfully!');
    } else {
      showAlert('Error', result.error || 'Failed to add category', [
        { text: 'OK', onPress: hideAlert },
      ]);
    }
  }, [addCategory, refreshCategories, updateField, showToast, showAlert, hideAlert]);

  const handleGeneratePassword = useCallback(() => {
    const result = generatePassword();
    if (result.success) {
      showToast('success', result.message);
    }
  }, [generatePassword, showToast]);

  const GenerateButton = useCallback(
    () => (
      <TouchableOpacity
        onPress={handleGeneratePassword}
        className="flex-row items-center"
      >
        <Lucide name="wand" size={16} color="#3B82F6" />
        <Text className="text-primary font-sans-medium text-sm ml-1">
          Generate
        </Text>
      </TouchableOpacity>
    ),
    [handleGeneratePassword],
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
            onAddCategory={() => setShowCategoryModal(true)}
            refreshKey={categoryRefreshKey}
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

          <View className="mb-4">
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
            <PasswordStrengthMeter password={formData.password} />
          </View>

          {!showUrlField ? (
            <TouchableOpacity
              onPress={() => setShowUrlField(true)}
              className="flex-row items-center mb-4"
            >
              <Lucide name="circle-plus" size={20} color="#3B82F6" />
              <Text className="text-primary font-sans-medium text-sm ml-2">
                Add Website URL
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center gap-4">
              <FormInput
                label="Website URL"
                icon="globe"
                value={formData.url}
                onChangeText={value => updateField('url', value)}
                placeholder="https://example.com"
                keyboardType="url"
                autoCapitalize="none"
                className="flex-1"
              />

              <TouchableOpacity
                onPress={() => setShowUrlField(false)}
                className="flex-row items-center"
              >
                <Lucide name="square-slash" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}

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

      <IosAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        buttons={alert.buttons}
        onClose={hideAlert}
      />


      <IosLoading visible={isLoading} message={isEdit ? 'Updating...' : 'Saving...'} />

      <AddCategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onAdd={handleAddCategory}
      />
    </SafeAreaView>
  );
}
