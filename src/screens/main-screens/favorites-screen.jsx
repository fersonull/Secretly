import { View, Text, FlatList } from 'react-native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCredentials } from '../../hooks/use-credentials';
import CredentialCard from '../../components/ui/credential-card';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { getFavoriteCredentials, refresh } = useCredentials();

  // Get favorite credentials directly from context
  const favoriteCredentials = getFavoriteCredentials();

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
        <Lucide name="heart" size={32} color="#6B7280" />
      </View>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg mb-2">
        No Favorites Yet
      </Text>
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-center text-base">
        Star your important credentials to see them here for quick access.
      </Text>
    </View>
  );

  if (favoriteCredentials.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="flex-1 bg-background dark:bg-dark-background">
      <FlatList
        data={favoriteCredentials}
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