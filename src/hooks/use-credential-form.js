import { useState } from 'react';

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
    return { success: true, message: 'A strong password has been generated' };
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return { isValid: false, error: 'Please enter a title' };
    }
    if (!formData.username.trim()) {
      return { isValid: false, error: 'Please enter a username or email' };
    }
    if (!formData.password.trim()) {
      return { isValid: false, error: 'Please enter a password' };
    }
    return { isValid: true };
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
