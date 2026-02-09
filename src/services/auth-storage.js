import { storage, STORAGE_KEYS } from '../utils/storage';

export const authStorage = {
  async saveAuthData(userData) {
    try {
      await storage.setItem(STORAGE_KEYS.USER_DATA, userData);
      await storage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, true);
      return true;
    } catch (error) {
      console.error('Error saving auth data:', error);
      return false;
    }
  },

  async getAuthData() {
    try {
      const userData = await storage.getItem(STORAGE_KEYS.USER_DATA);
      const isAuthenticated = await storage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
      return { userData, isAuthenticated };
    } catch (error) {
      console.error('Error getting auth data:', error);
      return { userData: null, isAuthenticated: false };
    }
  },

  async clearAuthData() {
    try {
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
      await storage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
      await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  },

  async isAuthenticated() {
    try {
      const isAuth = await storage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
      return isAuth === true;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  },
};
