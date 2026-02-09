import { useState, useEffect, useCallback } from 'react';
import { credentialsStorage } from '../services/credentials-storage';
import { useAuth } from '../context/auth-context';

export const useCredentials = () => {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadCredentials = useCallback(async () => {
    if (!user?.id) {
      setCredentials([]);
      setIsLoading(false);
      return;
    }

    try {
      const data = await credentialsStorage.getAllCredentials(user.id);
      setCredentials(data);
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadCredentials();
    setIsRefreshing(false);
  }, [loadCredentials]);

  const addCredential = useCallback(
    async credentialData => {
      if (!user?.id) return { success: false, error: 'User not found' };

      const result = await credentialsStorage.saveCredential(user.id, credentialData);
      
      if (result.success) {
        await loadCredentials();
      }
      
      return result;
    },
    [user?.id, loadCredentials]
  );

  const updateCredential = useCallback(
    async (credentialId, updates) => {
      if (!user?.id) return { success: false, error: 'User not found' };

      const result = await credentialsStorage.updateCredential(user.id, credentialId, updates);
      
      if (result.success) {
        await loadCredentials();
      }
      
      return result;
    },
    [user?.id, loadCredentials]
  );

  const deleteCredential = useCallback(
    async credentialId => {
      if (!user?.id) return { success: false, error: 'User not found' };

      const result = await credentialsStorage.deleteCredential(user.id, credentialId);
      
      if (result.success) {
        await loadCredentials();
      }
      
      return result;
    },
    [user?.id, loadCredentials]
  );

  const getCredentialById = useCallback(
    credentialId => {
      return credentials.find(c => c.id === credentialId) || null;
    },
    [credentials]
  );

  const getCredentialsByCategory = useCallback(
    category => {
      return credentials.filter(c => c.category === category);
    },
    [credentials]
  );

  const searchCredentials = useCallback(
    query => {
      if (!query.trim()) return credentials;
      
      const lowerQuery = query.toLowerCase();
      return credentials.filter(
        c =>
          c.title.toLowerCase().includes(lowerQuery) ||
          c.username.toLowerCase().includes(lowerQuery) ||
          c.url?.toLowerCase().includes(lowerQuery)
      );
    },
    [credentials]
  );

  return {
    credentials,
    isLoading,
    isRefreshing,
    refresh,
    addCredential,
    updateCredential,
    deleteCredential,
    getCredentialById,
    getCredentialsByCategory,
    searchCredentials,
  };
};
