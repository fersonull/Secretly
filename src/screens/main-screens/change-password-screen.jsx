import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../hooks/use-toast';
import FormInput from '../../components/credential/form-input';
import IosLoading from '../../components/ui/ios-loading';
import PasswordStrengthMeter from '../../components/ui/password-strength-meter';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { user, updatePassword } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validatePasswords = () => {
    if (!formData.currentPassword.trim()) {
      showToast('Please enter your current password', 'error');
      return false;
    }
    if (!formData.newPassword.trim()) {
      showToast('Please enter a new password', 'error');
      return false;
    }
    if (formData.newPassword.length < 8) {
      showToast('New password must be at least 8 characters long', 'error');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      showToast('New password must be different from current password', 'error');
      return false;
    }
    return true;
  };

  const handleSave = useCallback(async () => {
    if (!validatePasswords()) return;

    setIsLoading(true);
    try {
      const result = await updatePassword(formData.currentPassword, formData.newPassword);
      
      if (result.success) {
        showToast('Password updated successfully', 'success');
        navigation.goBack();
      } else {
        showToast(result.error || 'Failed to update password', 'error');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      showToast('An error occurred while updating password', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [formData, updatePassword, showToast, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border dark:border-dark-border">
        <TouchableOpacity
          onPress={handleCancel}
          className="w-12 h-12 items-center justify-center rounded-lg"
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Lucide name="x" size={24} color="#6B7280" />
        </TouchableOpacity>
        
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
          Change Password
        </Text>
        
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          className="px-4 py-2 bg-primary rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-white font-sans-medium text-base">
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Current Password */}
        <View className="mt-6">
          <FormInput
            label="Current Password"
            value={formData.currentPassword}
            onChangeText={(value) => updateField('currentPassword', value)}
            secureTextEntry={!showCurrentPassword}
            placeholder="Enter your current password"
            rightElement={
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                className="p-2"
              >
                <Lucide
                  name={showCurrentPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            }
          />
        </View>

        {/* New Password */}
        <View className="mt-4">
          <FormInput
            label="New Password"
            value={formData.newPassword}
            onChangeText={(value) => updateField('newPassword', value)}
            secureTextEntry={!showNewPassword}
            placeholder="Enter your new password"
            rightElement={
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                className="p-2"
              >
                <Lucide
                  name={showNewPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            }
          />
          
          {/* Password Strength Meter - right below new password field */}
          {formData.newPassword && (
            <View className="mt-3">
              <PasswordStrengthMeter password={formData.newPassword} />
            </View>
          )}
        </View>

        {/* Confirm New Password */}
        <View className="mt-4">
          <FormInput
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
            placeholder="Confirm your new password"
            rightElement={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-2"
              >
                <Lucide
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            }
          />
        </View>

      </ScrollView>

      {isLoading && <IosLoading visible={true} />}
    </SafeAreaView>
  );
}