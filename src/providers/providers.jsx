import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/auth-context';
import { ToastProvider } from '../context/toast-context';
import { CredentialsProvider } from '../context/credentials-context';

export default function Providers({ children }) {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ToastProvider>
          <CredentialsProvider>{children}</CredentialsProvider>
        </ToastProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
