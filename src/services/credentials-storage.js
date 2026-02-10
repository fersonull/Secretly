import { storage } from '../utils/storage';

const CREDENTIALS_STORAGE_KEY = '@user_credentials';

export const credentialsStorage = {
  async getAllCredentials(userId) {
    try {
      const allCredentials = await storage.getItem(CREDENTIALS_STORAGE_KEY);
      if (!allCredentials) return [];
      
      // Filter credentials by user ID
      return allCredentials.filter(c => c.userId === userId) || [];
    } catch (error) {
      console.error('Error getting credentials:', error);
      return [];
    }
  },

  async getCredentialById(userId, credentialId) {
    try {
      const credentials = await this.getAllCredentials(userId);
      return credentials.find(c => c.id === credentialId) || null;
    } catch (error) {
      console.error('Error getting credential by ID:', error);
      return null;
    }
  },

  async saveCredential(userId, credentialData) {
    try {
      const allCredentials = await storage.getItem(CREDENTIALS_STORAGE_KEY) || [];
      
      const newCredential = {
        ...credentialData,
        id: Date.now().toString(),
        userId,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      allCredentials.push(newCredential);
      await storage.setItem(CREDENTIALS_STORAGE_KEY, allCredentials);
      
      return { success: true, credential: newCredential };
    } catch (error) {
      console.error('Error saving credential:', error);
      return { success: false, error: 'Failed to save credential' };
    }
  },

  // Alias for saveCredential to maintain API consistency
  async addCredential(userId, credentialData) {
    return await this.saveCredential(userId, credentialData);
  },

  async updateCredential(userId, credentialId, updates) {
    try {
      const allCredentials = await storage.getItem(CREDENTIALS_STORAGE_KEY) || [];
      
      const index = allCredentials.findIndex(
        c => c.id === credentialId && c.userId === userId
      );

      if (index === -1) {
        return { success: false, error: 'Credential not found' };
      }

      allCredentials[index] = {
        ...allCredentials[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await storage.setItem(CREDENTIALS_STORAGE_KEY, allCredentials);
      
      return { success: true, credential: allCredentials[index] };
    } catch (error) {
      console.error('Error updating credential:', error);
      return { success: false, error: 'Failed to update credential' };
    }
  },

  async deleteCredential(userId, credentialId) {
    try {
      const allCredentials = await storage.getItem(CREDENTIALS_STORAGE_KEY) || [];
      
      const filtered = allCredentials.filter(
        c => !(c.id === credentialId && c.userId === userId)
      );

      await storage.setItem(CREDENTIALS_STORAGE_KEY, filtered);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting credential:', error);
      return { success: false, error: 'Failed to delete credential' };
    }
  },

  async getCredentialsByCategory(userId, category) {
    try {
      const credentials = await this.getAllCredentials(userId);
      return credentials.filter(c => c.category === category);
    } catch (error) {
      console.error('Error getting credentials by category:', error);
      return [];
    }
  },

  async searchCredentials(userId, query) {
    try {
      const credentials = await this.getAllCredentials(userId);
      const lowerQuery = query.toLowerCase();
      
      return credentials.filter(
        c =>
          c.title.toLowerCase().includes(lowerQuery) ||
          c.username.toLowerCase().includes(lowerQuery) ||
          c.url?.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching credentials:', error);
      return [];
    }
  },

  async toggleFavorite(userId, credentialId) {
    try {
      const credential = await this.getCredentialById(userId, credentialId);
      if (!credential) {
        return { success: false, error: 'Credential not found' };
      }

      const result = await this.updateCredential(userId, credentialId, {
        isFavorite: !credential.isFavorite,
      });

      return result;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return { success: false, error: 'Failed to toggle favorite' };
    }
  },

  async getFavoriteCredentials(userId) {
    try {
      const credentials = await this.getAllCredentials(userId);
      return credentials.filter(c => c.isFavorite);
    } catch (error) {
      console.error('Error getting favorite credentials:', error);
      return [];
    }
  },
};
