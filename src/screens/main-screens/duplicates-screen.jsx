import { View, Text, FlatList } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCredentials } from '../../hooks/use-credentials';
import CredentialCard from '../../components/ui/credential-card';

export default function DuplicatesScreen() {
  const navigation = useNavigation();
  const { getDuplicatePasswordCredentials, refresh } = useCredentials();

  // Get duplicate password credentials directly from context
  const duplicateCredentials = getDuplicatePasswordCredentials();
  
  // Group duplicates by password
  const duplicateGroups = useMemo(() => {
    const passwordGroups = {};

    duplicateCredentials.forEach(credential => {
      const password = credential.password;
      if (!passwordGroups[password]) {
        passwordGroups[password] = [];
      }
      passwordGroups[password].push(credential);
    });

    return Object.values(passwordGroups)
      .sort((a, b) => b.length - a.length); // Sort by group size descending
  }, [duplicateCredentials]);

  const allDuplicateCredentials = useMemo(() => {
    return duplicateGroups.flat();
  }, [duplicateGroups]);

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

  const renderGroupHeader = useCallback(
    ({ groupSize, password }) => (
      <View className="bg-warning/10 border border-warning/20 rounded-lg mx-4 mb-3 mt-4 p-3">
        <View className="flex-row items-center">
          <Lucide name="copy" size={16} color="#F59E0B" />
          <Text className="text-warning font-sans-medium text-sm ml-2">
            {groupSize} accounts using the same password
          </Text>
        </View>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item, isFirstInGroup, groupSize }) => (
      <>
        {isFirstInGroup &&
          renderGroupHeader({ groupSize, password: item.password })}
        <CredentialCard
          item={item}
          onPress={() => handleViewCredential(item.id)}
          onEdit={handleEditCredential}
          onRefresh={refresh}
        />
      </>
    ),
    [handleViewCredential, handleEditCredential, refresh, renderGroupHeader],
  );

  // Create flat list data with group information
  const flatListData = useMemo(() => {
    const data = [];
    duplicateGroups.forEach(group => {
      group.forEach((credential, index) => {
        data.push({
          ...credential,
          isFirstInGroup: index === 0,
          groupSize: group.length,
        });
      });
    });
    return data;
  }, [duplicateGroups]);

  const HeaderWarning = () => (
    <View className="bg-warning/10 border border-warning/20 rounded-lg mx-4 mb-4 p-4">
      <View className="flex-row items-center mb-2">
        <Lucide name="alert-triangle" size={20} color="#F59E0B" />
        <Text className="text-warning font-sans-bold text-base ml-2">
          Duplicate Passwords Found
        </Text>
      </View>
      <Text className="text-warning/80 font-sans text-sm">
        {allDuplicateCredentials.length} credentials are using duplicate passwords
        across {duplicateGroups.length} group
        {duplicateGroups.length !== 1 ? 's' : ''}. Consider using unique
        passwords for better security.
      </Text>
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <View className="bg-success/10 p-6 rounded-full mb-4">
        <Lucide name="circle-check" size={32} color="#10B981" />
      </View>
      <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg mb-2">
        No Duplicate Passwords
      </Text>
      <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-center text-base">
        Excellent! All your passwords are unique.
      </Text>
    </View>
  );

  if (duplicateGroups.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="flex-1 bg-background dark:bg-dark-background">
      <HeaderWarning />
      <FlatList
        data={flatListData}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}-${item.isFirstInGroup}`}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
