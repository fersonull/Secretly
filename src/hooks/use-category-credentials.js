import { useMemo } from 'react';
import { useCredentials } from './use-credentials';

export const useCategoryCredentials = category => {
  const { credentials: allCredentials } = useCredentials();
  
  const credentials = useMemo(() => {
    return allCredentials.filter(item => item.category === category);
  }, [allCredentials, category]);

  return { credentials };
};
