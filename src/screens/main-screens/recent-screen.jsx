import { View, Text, FlatList } from 'react-native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCredentials } from '../../hooks/use-credentials';
import CredentialCard from '../../components/ui/credential-card';

export default function RecentScreen() {
  const navigation = useNavigation();
  const { getRecentCredentials, refresh } = useCredentials();

  // Get recent credentials directly from context
  const recentCredentials = getRecentCredentials(10);

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

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <View className="bg-background-muted dark:bg-dark-background-muted p-6 rounded-full mb-4">
        <Lucide name="clock" size={32} color="#6B7280" />
      </View>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg mb-2">
        No Recent Activity
      </Text>
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-center text-base">
        Your recently accessed credentials will appear here.
      </Text>
    </View>
  );

  if (recentCredentials.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="flex-1 bg-background dark:bg-dark-background">
      <FlatList
        data={recentCredentials}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}