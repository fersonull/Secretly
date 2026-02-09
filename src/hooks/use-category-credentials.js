import { useMemo } from 'react';

const MOCK_CREDENTIALS = [
  {
    id: '1',
    title: 'Facebook',
    username: 'john.doe@email.com',
    category: 'social',
    url: 'https://facebook.com',
  },
  {
    id: '2',
    title: 'Chase Bank',
    username: 'johndoe',
    category: 'banking',
    url: 'https://chase.com',
  },
  {
    id: '3',
    title: 'Gmail',
    username: 'john.doe@gmail.com',
    category: 'email',
    url: 'https://gmail.com',
  },
  {
    id: '4',
    title: 'Amazon',
    username: 'john_doe',
    category: 'shopping',
    url: 'https://amazon.com',
  },
  {
    id: '5',
    title: 'LinkedIn',
    username: 'john-doe',
    category: 'social',
    url: 'https://linkedin.com',
  },
  {
    id: '6',
    title: 'Work Email',
    username: 'john.doe@company.com',
    category: 'work',
    url: 'https://outlook.office.com',
  },
  {
    id: '7',
    title: 'Twitter',
    username: '@johndoe',
    category: 'social',
    url: 'https://twitter.com',
  },
  {
    id: '8',
    title: 'Personal Email',
    username: 'john.doe@yahoo.com',
    category: 'email',
    url: 'https://mail.yahoo.com',
  },
  {
    id: '9',
    title: 'Wells Fargo',
    username: 'john_doe',
    category: 'banking',
    url: 'https://wellsfargo.com',
  },
];

export const useCategoryCredentials = category => {
  const credentials = useMemo(() => {
    return MOCK_CREDENTIALS.filter(item => item.category === category);
  }, [category]);

  return { credentials };
};
