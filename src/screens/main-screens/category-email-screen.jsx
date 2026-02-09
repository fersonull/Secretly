import { View, Text, FlatList } from 'react-native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCategoryCredentials } from '../../hooks/use-category-credentials';
import { useCredentials } from '../../hooks/use-credentials';
import CredentialCard from '../../components/ui/credential-card';

export default function CategoryEmailScreen() {
  const navigation = useNavigation();
  const { refresh } = useCredentials();
  const { credentials } = useCategoryCredentials('email');

  const handleViewCredential = useCallback(
    id => {
      navigation.navigate('ViewCredential', { id });
    },
    [navigation]
  );

  const handleEditCredential = useCallback((credential) => {
    navigation.navigate('AddEditCredential', { id: credential.id });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) => (
      <CredentialCard 
        item={item} 
        onPress={() => handleViewCredential(item.id)}
        onEdit={handleEditCredential}
        onRefresh={refresh}
      />
    ),
    [handleViewCredential, handleEditCredential, refresh]
  );

  const renderEmpty = useCallback(
    () => (
      <View className="flex-1 items-center justify-center py-16">
        <View className="w-20 h-20 rounded-full bg-background-muted dark:bg-dark-background-muted items-center justify-center mb-4">
          <Lucide name="mail" size={32} color="#71717A" />
        </View>
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg mb-2">
          No Email Accounts
        </Text>
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm text-center px-8">
          Add your email credentials to get started
        </Text>
      </View>
    ),
    []
  );

  return (
    <View className="bg-background dark:bg-dark-background flex-1">
      <FlatList
        data={credentials}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}
