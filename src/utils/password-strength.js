/**
 * Calculate password strength based on various criteria
 * @param {string} password - The password to evaluate
 * @returns {Object} - Object containing strength information
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Very Weak', strength: 'weak' };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety scoring
  if (checks.hasLower) score += 1;
  if (checks.hasUpper) score += 1;
  if (checks.hasNumber) score += 1;
  if (checks.hasSpecial) score += 1;

  // Determine strength level
  let strengthInfo = { 
    score: 0, 
    label: 'Very Weak', 
    color: '#EF4444', 
    barColor: 'bg-danger',
    strength: 'weak'
  };
  
  if (score >= 7) {
    strengthInfo = { 
      score: 4, 
      label: 'Very Strong', 
      color: '#10B981', 
      barColor: 'bg-success',
      strength: 'strong'
    };
  } else if (score >= 5) {
    strengthInfo = { 
      score: 3, 
      label: 'Strong', 
      color: '#22C55E', 
      barColor: 'bg-success',
      strength: 'strong'
    };
  } else if (score >= 3) {
    strengthInfo = { 
      score: 2, 
      label: 'Medium', 
      color: '#F59E0B', 
      barColor: 'bg-warning',
      strength: 'medium'
    };
  } else if (score >= 1) {
    strengthInfo = { 
      score: 1, 
      label: 'Weak', 
      color: '#EF4444', 
      barColor: 'bg-danger',
      strength: 'weak'
    };
  }

  return { ...strengthInfo, checks };
};