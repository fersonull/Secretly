import { useState, useCallback } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({ visible: false, title: '', message: '', buttons: [] });

  const showAlert = useCallback((title, message, buttons = []) => {
    setAlert({ visible: true, title, message, buttons });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, visible: false }));
  }, []);

  return {
    alert,
    showAlert,
    hideAlert,
  };
};
