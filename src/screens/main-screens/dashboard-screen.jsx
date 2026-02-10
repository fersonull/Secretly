import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../../hooks/use-dashboard';
import AppHeader from '../../components/common/app-header';
import SearchBar from '../../components/credential/search-bar';
import StatsCards from '../../components/dashboard/stats-cards';
import CategoryChips from '../../components/dashboard/category-chips';
import CredentialCard from '../../components/ui/credential-card';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const {
    credentials,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categoryCount,
    stats,
    refreshing,
    onRefresh,
  } = useDashboard();

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
    navigation.navigate('AddEditCredential', { id: credential.id });
  }, [navigation]);

  const handleStatCardPress = useCallback((statType) => {
    // Navigate to organize screen - the tab selection will be handled in the screen
    navigation.navigate('Organize', {
      screen: 'OrganizeTabs',
      params: { 
        screen: statType === 'weak' ? 'WeakPasswords' : 
               statType === 'duplicates' ? 'Duplicates' :
               statType === 'strong' ? 'Recent' : 'Favorites'
      }
    });
  }, [navigation]);

  const handleViewAll = useCallback(() => {
    navigation.navigate('CredentialList');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) => (
      <CredentialCard
        item={item}
        onPress={() => handleViewCredential(item.id)}
        onEdit={handleEditCredential}
        onRefresh={onRefresh}
      />
    ),
    [handleViewCredential, handleEditCredential, onRefresh],
  );

  const renderHeader = useCallback(
    () => (
      <>
        <View className="pb-2 pt-4">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search credentials..."
          />
        </View>

        <StatsCards
          total={stats.total}
          strong={stats.strong}
          weak={stats.weak}
          duplicates={stats.duplicates}
          onCardPress={handleStatCardPress}
        />

        <CategoryChips
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          categoryCount={categoryCount}
        />

        <View className="pt-2">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
              Recent Credentials
            </Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text className="text-primary font-sans-medium text-sm">
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    ),
    [
      searchQuery,
      setSearchQuery,
      stats,
      selectedCategory,
      setSelectedCategory,
      categoryCount,
      handleViewAll,
    ],
  );

  const renderEmpty = useCallback(
    () => (
      <View className="py-12 items-center">
        <Lucide name="search-x" size={48} color="#71717A" />
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm mt-4">
          No credentials found
        </Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <AppHeader title="Dashboard" />

      <FlatList
        data={credentials}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
      />

      <TouchableOpacity
        onPress={handleAddCredential}
        className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center"
        style={{
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <Lucide name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
