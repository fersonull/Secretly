import { useState, useEffect, useCallback } from 'react';
import { categoriesStorage } from '../services/categories-storage';
import { useAuth } from '../context/auth-context';

const DEFAULT_CATEGORIES = [
  { id: 'social', label: 'Social Media', icon: 'share-2', isCustom: false },
  { id: 'banking', label: 'Banking', icon: 'landmark', isCustom: false },
  { id: 'email', label: 'Email', icon: 'mail', isCustom: false },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-cart', isCustom: false },
  { id: 'work', label: 'Work', icon: 'briefcase', isCustom: false },
  { id: 'other', label: 'Other', icon: 'key', isCustom: false },
];

export const useCategories = () => {
  const { user } = useAuth();
  const [customCategories, setCustomCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    if (!user?.id) {
      setCustomCategories([]);
      setIsLoading(false);
      return;
    }

    try {
      const data = await categoriesStorage.getCustomCategories(user.id);
      setCustomCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const addCategory = useCallback(
    async (categoryName, icon = 'folder') => {
      if (!user?.id) return { success: false, error: 'User not found' };

      const result = await categoriesStorage.addCustomCategory(user.id, categoryName, icon);
      
      if (result.success) {
        await loadCategories();
      }
      
      return result;
    },
    [user?.id, loadCategories]
  );

  const deleteCategory = useCallback(
    async categoryId => {
      if (!user?.id) return { success: false, error: 'User not found' };

      const result = await categoriesStorage.deleteCustomCategory(user.id, categoryId);
      
      if (result.success) {
        await loadCategories();
      }
      
      return result;
    },
    [user?.id, loadCategories]
  );

  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  const refresh = useCallback(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories: allCategories,
    customCategories,
    defaultCategories: DEFAULT_CATEGORIES,
    isLoading,
    addCategory,
    deleteCategory,
    refresh,
  };
};
