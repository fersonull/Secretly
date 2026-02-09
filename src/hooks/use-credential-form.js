import { useState } from 'react';
import { Alert } from 'react-native';

export const useCredentialForm = (initialData = null) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    username: initialData?.username || '',
    password: initialData?.password || '',
    url: initialData?.url || '',
    notes: initialData?.notes || '',
    category: initialData?.category || 'other',
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const generatedPassword = Array.from({ length: 16 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
    
    updateField('password', generatedPassword);
    Alert.alert('Password Generated', 'A strong password has been generated');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert('Validation Error', 'Please enter a username or email');
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert('Validation Error', 'Please enter a password');
      return false;
    }
    return true;
  };

  return {
    formData,
    updateField,
    showPassword,
    setShowPassword,
    generatePassword,
    validateForm,
  };
};
