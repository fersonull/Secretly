import { createContext, useContext, useState, useEffect } from 'react';
import { authStorage } from '../services/auth-storage';
import { hashPassword, verifyPassword } from '../utils/crypto';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { userData, isAuthenticated } = await authStorage.getAuthData();
      if (isAuthenticated && userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Find user by email
      const existingUser = await authStorage.findUserByEmail(email);
      
      if (!existingUser) {
        return { success: false, error: 'No account found with this email' };
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, existingUser.password);
      
      if (!isPasswordValid) {
        return { success: false, error: 'Invalid password' };
      }

      // Save session
      const userData = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      };

      const saved = await authStorage.saveAuthData(userData);
      if (saved) {
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: 'Failed to save session' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const register = async (email, password) => {
    try {
      // Hash password
      const hashedPassword = await hashPassword(password);
      
      if (!hashedPassword) {
        return { success: false, error: 'Failed to secure password' };
      }

      // Extract name from email
      const name = email.split('@')[0];

      // Register user in storage
      const result = await authStorage.registerUser(email, hashedPassword, name);
      
      if (!result.success) {
        return result;
      }

      // Auto-login after registration
      const saved = await authStorage.saveAuthData(result.user);
      
      if (saved) {
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: 'Account created but login failed' };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = async () => {
    try {
      await authStorage.clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      // Get current user data with password
      const currentUser = await authStorage.findUserByEmail(user.email);
      if (!currentUser) {
        return { success: false, error: 'User not found' };
      }

      // Verify current password
      const isCurrentPasswordValid = await verifyPassword(currentPassword, currentUser.password);
      if (!isCurrentPasswordValid) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Hash new password
      const newHashedPassword = await hashPassword(newPassword);
      if (!newHashedPassword) {
        return { success: false, error: 'Failed to secure new password' };
      }

      // Update password in storage
      const result = await authStorage.updateUserPassword(user.id, newHashedPassword);
      if (!result.success) {
        return result;
      }

      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: 'An error occurred while updating password' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
