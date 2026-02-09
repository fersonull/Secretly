import { useState, useMemo, useCallback } from 'react';

const MOCK_CREDENTIALS = [
  {
    id: '1',
    title: 'Facebook',
    username: 'john.doe@email.com',
    category: 'social',
    url: 'https://facebook.com',
    passwordStrength: 'strong',
    updatedAt: '2024-02-01',
  },
  {
    id: '2',
    title: 'Chase Bank',
    username: 'johndoe',
    category: 'banking',
    url: 'https://chase.com',
    passwordStrength: 'weak',
    updatedAt: '2024-01-28',
  },
  {
    id: '3',
    title: 'Gmail',
    username: 'john.doe@gmail.com',
    category: 'email',
    url: 'https://gmail.com',
    passwordStrength: 'strong',
    updatedAt: '2024-02-05',
  },
  {
    id: '4',
    title: 'Amazon',
    username: 'john_doe',
    category: 'shopping',
    url: 'https://amazon.com',
    passwordStrength: 'medium',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    title: 'LinkedIn',
    username: 'john-doe',
    category: 'social',
    url: 'https://linkedin.com',
    passwordStrength: 'strong',
    updatedAt: '2024-02-03',
  },
  {
    id: '6',
    title: 'Work Email',
    username: 'john.doe@company.com',
    category: 'work',
    url: 'https://outlook.office.com',
    passwordStrength: 'weak',
    updatedAt: '2024-01-20',
  },
];

export const useDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const stats = useMemo(() => {
    const total = MOCK_CREDENTIALS.length;
    const strong = MOCK_CREDENTIALS.filter(c => c.passwordStrength === 'strong').length;
    const weak = MOCK_CREDENTIALS.filter(c => c.passwordStrength === 'weak').length;

    return { total, strong, weak };
  }, []);

  const categoryCount = useMemo(() => {
    return MOCK_CREDENTIALS.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const filteredCredentials = useMemo(() => {
    let filtered = MOCK_CREDENTIALS;

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
  }, [searchQuery, selectedCategory]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return {
    credentials: filteredCredentials,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categoryCount,
    stats,
    refreshing,
    onRefresh,
  };
};
