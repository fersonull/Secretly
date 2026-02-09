import { storage } from '../utils/storage';

const CATEGORIES_STORAGE_KEY = '@custom_categories';

export const categoriesStorage = {
  async getCustomCategories(userId) {
    try {
      const allCategories = await storage.getItem(CATEGORIES_STORAGE_KEY) || [];
      return allCategories.filter(c => c.userId === userId);
    } catch (error) {
      console.error('Error getting custom categories:', error);
      return [];
    }
  },

  async addCustomCategory(userId, categoryName, icon = 'folder') {
    try {
      const allCategories = await storage.getItem(CATEGORIES_STORAGE_KEY) || [];
      
      const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
      
      // Check if category already exists for this user
      const exists = allCategories.some(
        c => c.userId === userId && c.id === categoryId
      );
      
      if (exists) {
        return { success: false, error: 'Category already exists' };
      }

      const newCategory = {
        id: categoryId,
        label: categoryName,
        icon,
        userId,
        isCustom: true,
        createdAt: new Date().toISOString(),
      };

      allCategories.push(newCategory);
      await storage.setItem(CATEGORIES_STORAGE_KEY, allCategories);

      return { success: true, category: newCategory };
    } catch (error) {
      console.error('Error adding custom category:', error);
      return { success: false, error: 'Failed to add category' };
    }
  },

  async deleteCustomCategory(userId, categoryId) {
    try {
      const allCategories = await storage.getItem(CATEGORIES_STORAGE_KEY) || [];
      const filtered = allCategories.filter(
        c => !(c.userId === userId && c.id === categoryId)
      );
      
      await storage.setItem(CATEGORIES_STORAGE_KEY, filtered);
      return { success: true };
    } catch (error) {
      console.error('Error deleting custom category:', error);
      return { success: false, error: 'Failed to delete category' };
    }
  },
};
