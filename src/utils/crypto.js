// Simple hash function for password storage
// In production, use a proper crypto library like crypto-js or bcrypt
export const hashPassword = async (password) => {
  try {
    // Simple hash simulation - replace with proper encryption in production
    const hash = btoa(password + 'SALT_KEY_SECRET');
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    return null;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const hash = await hashPassword(password);
    return hash === hashedPassword;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
};
