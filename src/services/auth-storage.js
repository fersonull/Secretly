import { storage, STORAGE_KEYS } from '../utils/storage';

const USERS_STORAGE_KEY = '@registered_users';

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

  async registerUser(email, hashedPassword, name) {
    try {
      const users = await this.getAllUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        name,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await storage.setItem(USERS_STORAGE_KEY, users);

      return { success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, error: 'Failed to register user' };
    }
  },

  async findUserByEmail(email) {
    try {
      const users = await this.getAllUsers();
      return users.find(u => u.email === email) || null;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  },

  async getAllUsers() {
    try {
      const users = await storage.getItem(USERS_STORAGE_KEY);
      return users || [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },
};
