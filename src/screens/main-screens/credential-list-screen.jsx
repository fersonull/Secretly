import { View, Text, FlatList } from 'react-native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCredentialList } from '../../hooks/use-credential-list';
import { useCredentials } from '../../hooks/use-credentials';
import CredentialListHeader from '../../components/credential/credential-list-header';
import SearchBar from '../../components/credential/search-bar';
import FilterChips from '../../components/credential/filter-chips';
import SortDropdown from '../../components/credential/sort-dropdown';
import CredentialCard from '../../components/ui/credential-card';
import EmptyState from '../../components/credential/empty-state';

export default function CredentialListScreen() {
  const navigation = useNavigation();
  const { refresh } = useCredentials();
  const {
    credentials,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categoryCount,
    totalCount,
  } = useCredentialList();

  const handleViewCredential = useCallback(
    id => {
      navigation.navigate('ViewCredential', { id });
    },
    [navigation],
  );

  const handleAddCredential = useCallback(() => {
    navigation.navigate('AddEditCredential');
  }, [navigation]);

  const handleEditCredential = useCallback((credential) => {
    navigation.navigate('AddEditCredential', { credential });
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
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
    [handleViewCredential, handleEditCredential],
  );

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <CredentialListHeader
        totalCount={totalCount}
        onBack={handleBack}
        onAdd={handleAddCredential}
      />

      <View className="flex-1">
        <View className="px-4 pt-4 pb-2">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search credentials..."
          />
        </View>

        <View className="py-3">
          <FilterChips
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            categoryCount={categoryCount}
          />
        </View>

        <View className="px-4 mb-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans-medium text-sm">
              Sort by
            </Text>
            <View className="w-48">
              <SortDropdown selected={sortBy} onSelect={setSortBy} />
            </View>
          </View>
        </View>

        <FlatList
          data={credentials}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
