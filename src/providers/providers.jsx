import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/auth-context';
import { ToastProvider } from '../context/toast-context';

export default function Providers({ children }) {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
