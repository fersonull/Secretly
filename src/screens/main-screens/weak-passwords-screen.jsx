import { View, Text, FlatList } from 'react-native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCredentials } from '../../hooks/use-credentials';
import CredentialCard from '../../components/ui/credential-card';

export default function WeakPasswordsScreen() {
  const navigation = useNavigation();
  const { credentials, refresh } = useCredentials();

  // Filter credentials with weak passwords
  const weakPasswordCredentials = credentials.filter(
    credential => credential.passwordStrength === 'weak',
  );

  const handleViewCredential = useCallback(
    id => {
      navigation.navigate('ViewCredential', { id });
    },
    [navigation],
  );

  const handleEditCredential = useCallback(
    credential => {
      navigation.navigate('AddEditCredential', { id: credential.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <CredentialCard
        item={item}
        onPress={() => handleViewCredential(item.id)}
        onEdit={handleEditCredential}
        onRefresh={refresh}
      />
    ),
    [handleViewCredential, handleEditCredential, refresh],
  );

  const HeaderWarning = () => (
    <View className="bg-danger/10 border border-danger/20 rounded-lg mx-4 mb-4 mt-4 p-4">
      <View className="flex-row items-center mb-2">
        <Lucide name="shield-alert" size={20} color="#EF4444" />
        <Text className="text-danger font-sans-bold text-base ml-2">
          Security Alert
        </Text>
      </View>
      <Text className="text-danger/80 font-sans text-sm">
        {weakPasswordCredentials.length} credential
        {weakPasswordCredentials.length !== 1 ? 's' : ''} with weak password
        {weakPasswordCredentials.length !== 1 ? 's' : ''} found. Update these
        passwords to improve your security.
      </Text>
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <View className="bg-success/10 p-6 rounded-full mb-4">
        <Lucide name="shield-check" size={32} color="#10B981" />
      </View>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg mb-2">
        No Weak Passwords Found
      </Text>
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-center text-base">
        Great job! All your passwords meet security requirements.
      </Text>
    </View>
  );

  if (weakPasswordCredentials.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="flex-1 bg-background dark:bg-dark-background">
      <HeaderWarning />
      <FlatList
        data={weakPasswordCredentials}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
