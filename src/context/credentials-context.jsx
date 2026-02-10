import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { credentialsStorage } from '../services/credentials-storage';
import { useAuth } from './auth-context';
import { useToast } from '../hooks/use-toast';

const CredentialsContext = createContext(null);

export const useCredentials = () => {
  const context = useContext(CredentialsContext);
  if (!context) {
    throw new Error('useCredentials must be used within a CredentialsProvider');
  }
  return context;
};

export const CredentialsProvider = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load credentials from storage
  const loadCredentials = useCallback(async () => {
    if (!user?.id) {
      setCredentials([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await credentialsStorage.getAllCredentials(user.id);
      setCredentials(data || []);
    } catch (err) {
      console.error('Error loading credentials:', err);
      setError('Failed to load credentials');
      setCredentials([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Refresh credentials (force reload from storage)
  const refresh = useCallback(async () => {
    await loadCredentials();
  }, [loadCredentials]);

  // Add a new credential
  const addCredential = useCallback(
    async credentialData => {
      if (!user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      try {
        const result = await credentialsStorage.addCredential(
          user.id,
          credentialData,
        );
        if (result.success) {
          // Update local state immediately
          setCredentials(prev => [...prev, result.credential]);
        }
        return result;
      } catch (error) {
        console.error('Error adding credential:', error);
        return { success: false, error: 'Failed to add credential' };
      }
    },
    [user?.id],
  );

  // Update a credential
  const updateCredential = useCallback(
    async (credentialId, updates) => {
      if (!user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      try {
        const result = await credentialsStorage.updateCredential(
          user.id,
          credentialId,
          updates,
        );
        if (result.success) {
          // Update local state immediately
          setCredentials(prev =>
            prev.map(cred =>
              cred.id === credentialId
                ? { ...cred, ...updates, updatedAt: new Date().toISOString() }
                : cred,
            ),
          );
        }
        return result;
      } catch (error) {
        console.error('Error updating credential:', error);
        return { success: false, error: 'Failed to update credential' };
      }
    },
    [user?.id],
  );

  // Delete a credential
  const deleteCredential = useCallback(
    async credentialId => {
      if (!user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      try {
        const result = await credentialsStorage.deleteCredential(
          user.id,
          credentialId,
        );
        if (result.success) {
          // Update local state immediately
          setCredentials(prev => prev.filter(cred => cred.id !== credentialId));
        }
        return result;
      } catch (error) {
        console.error('Error deleting credential:', error);
        return { success: false, error: 'Failed to delete credential' };
      }
    },
    [user?.id],
  );

  // Get credential by ID
  const getCredentialById = useCallback(
    credentialId => {
      return credentials.find(cred => cred.id === credentialId) || null;
    },
    [credentials],
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    async credentialId => {
      const credential = getCredentialById(credentialId);
      if (!credential) {
        return { success: false, error: 'Credential not found' };
      }

      const newFavoriteStatus = !credential.isFavorite;
      const result = await updateCredential(credentialId, {
        isFavorite: newFavoriteStatus,
      });

      if (result.success) {
        const action = newFavoriteStatus ? 'added to' : 'removed from';
        showToast(`${credential.title} ${action} favorites`, 'success');
      }

      return result;
    },
    [getCredentialById, updateCredential, showToast],
  );

  // Search credentials
  const searchCredentials = useCallback(
    query => {
      if (!query || query.trim() === '') {
        return credentials;
      }

      const lowercaseQuery = query.toLowerCase();
      return credentials.filter(
        credential =>
          credential.title.toLowerCase().includes(lowercaseQuery) ||
          credential.username.toLowerCase().includes(lowercaseQuery) ||
          credential.url?.toLowerCase().includes(lowercaseQuery) ||
          credential.notes?.toLowerCase().includes(lowercaseQuery),
      );
    },
    [credentials],
  );

  // Get credentials by category
  const getCredentialsByCategory = useCallback(
    categoryId => {
      if (categoryId === 'all' || !categoryId) {
        return credentials;
      }
      return credentials.filter(
        credential => credential.category === categoryId,
      );
    },
    [credentials],
  );

  // Get favorite credentials
  const getFavoriteCredentials = useCallback(() => {
    return credentials.filter(credential => credential.isFavorite);
  }, [credentials]);

  // Get recent credentials
  const getRecentCredentials = useCallback(
    (limit = 10) => {
      return [...credentials]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, limit);
    },
    [credentials],
  );

  // Get weak password credentials
  const getWeakPasswordCredentials = useCallback(() => {
    return credentials.filter(
      credential => credential.passwordStrength === 'weak',
    );
  }, [credentials]);

  // Get duplicate password credentials
  const getDuplicatePasswordCredentials = useCallback(() => {
    const passwordGroups = {};

    credentials.forEach(credential => {
      // Add comprehensive null checks
      if (
        credential &&
        credential.password &&
        typeof credential.password === 'string' &&
        credential.password.length > 0
      ) {
        const password = credential.password;
        if (!passwordGroups[password]) {
          passwordGroups[password] = [];
        }
        passwordGroups[password].push(credential);
      }
    });

    return Object.values(passwordGroups)
      .filter(group => group && group.length > 1)
      .flat()
      .filter(credential => credential != null); // Remove any null/undefined credentials
  }, [credentials]);

  // Load credentials when user changes
  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  const value = {
    // State
    credentials,
    isLoading,
    error,

    // Actions
    refresh,
    addCredential,
    updateCredential,
    deleteCredential,
    toggleFavorite,

    // Getters
    getCredentialById,
    searchCredentials,
    getCredentialsByCategory,
    getFavoriteCredentials,
    getRecentCredentials,
    getWeakPasswordCredentials,
    getDuplicatePasswordCredentials,
  };

  return (
    <CredentialsContext.Provider value={value}>
      {children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsContext;
