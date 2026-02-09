import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/auth-context';

export default function Providers({ children }) {
  return (
    <SafeAreaProvider>
      <AuthProvider>{children}</AuthProvider>
    </SafeAreaProvider>
  );
}
