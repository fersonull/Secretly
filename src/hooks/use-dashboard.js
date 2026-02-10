import { useState, useMemo, useCallback } from 'react';
import { useCredentials } from './use-credentials';

export const useDashboard = () => {
  const { credentials: allCredentials, isLoading, refresh, getDuplicatePasswordCredentials } = useCredentials();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stats = useMemo(() => {
    const total = allCredentials.length;
    const strong = allCredentials.filter(c => 
      c.passwordStrength === 'strong' || c.passwordStrength === 'medium'
    ).length;
    const weak = allCredentials.filter(c => c.passwordStrength === 'weak').length;
    const duplicates = getDuplicatePasswordCredentials().length;

    return { total, strong, weak, duplicates };
  }, [allCredentials, getDuplicatePasswordCredentials]);

  const categoryCount = useMemo(() => {
    return allCredentials.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
  }, [allCredentials]);

  const filteredCredentials = useMemo(() => {
    let filtered = allCredentials;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.username.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered.slice(0, 6);
  }, [allCredentials, searchQuery, selectedCategory]);

  const onRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  return {
    credentials: filteredCredentials,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categoryCount,
    stats,
    refreshing: isLoading,
    onRefresh,
  };
};
