import { useState, useMemo } from 'react';

const MOCK_CREDENTIALS = [
  {
    id: '1',
    title: 'Facebook',
    username: 'john.doe@email.com',
    category: 'social',
    url: 'https://facebook.com',
    updatedAt: '2024-02-01',
  },
  {
    id: '2',
    title: 'Chase Bank',
    username: 'johndoe',
    category: 'banking',
    url: 'https://chase.com',
    updatedAt: '2024-01-28',
  },
  {
    id: '3',
    title: 'Gmail',
    username: 'john.doe@gmail.com',
    category: 'email',
    url: 'https://gmail.com',
    updatedAt: '2024-02-05',
  },
  {
    id: '4',
    title: 'Amazon',
    username: 'john_doe',
    category: 'shopping',
    url: 'https://amazon.com',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    title: 'LinkedIn',
    username: 'john-doe',
    category: 'social',
    url: 'https://linkedin.com',
    updatedAt: '2024-02-03',
  },
  {
    id: '6',
    title: 'Work Email',
    username: 'john.doe@company.com',
    category: 'work',
    url: 'https://outlook.office.com',
    updatedAt: '2024-01-20',
  },
  {
    id: '7',
    title: 'Twitter',
    username: '@johndoe',
    category: 'social',
    url: 'https://twitter.com',
    updatedAt: '2024-01-25',
  },
  {
    id: '8',
    title: 'Netflix',
    username: 'john.doe@email.com',
    category: 'shopping',
    url: 'https://netflix.com',
    updatedAt: '2024-01-10',
  },
];

export const useCredentialList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredAndSortedCredentials = useMemo(() => {
    let filtered = MOCK_CREDENTIALS;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.username.toLowerCase().includes(query) ||
          item.url?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'oldest':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  const categoryCount = useMemo(() => {
    return MOCK_CREDENTIALS.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
  }, []);

  return {
    credentials: filteredAndSortedCredentials,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categoryCount,
    totalCount: MOCK_CREDENTIALS.length,
  };
};
