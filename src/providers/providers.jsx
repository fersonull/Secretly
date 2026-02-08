import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Providers({ children }) {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
