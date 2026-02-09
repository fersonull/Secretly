import { useState, useCallback } from 'react';

export const useActionSheet = () => {
  const [actionSheet, setActionSheet] = useState({
    visible: false,
    title: '',
    message: '',
    options: [],
  });

  const showActionSheet = useCallback((title, message, options = []) => {
    setActionSheet({ visible: true, title, message, options });
  }, []);

  const hideActionSheet = useCallback(() => {
    setActionSheet(prev => ({ ...prev, visible: false }));
  }, []);

  return {
    actionSheet,
    showActionSheet,
    hideActionSheet,
  };
};
