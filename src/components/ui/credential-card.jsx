import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { useCategories } from '../../hooks/use-categories';
import { useActionSheet } from '../../hooks/use-action-sheet';
import { useAuth } from '../../context/auth-context';
import { useCredentials } from '../../hooks/use-credentials';
import IosActionSheet from './ios-action-sheet';

export default function CredentialCard({
  item,
  onPress,
  onEdit,
  onDelete,
  onRefresh,
}) {
  const { user } = useAuth();
  const { actionSheet, showActionSheet, hideActionSheet } = useActionSheet();
  const { categories } = useCategories();
  const { toggleFavorite } = useCredentials();

  const getCategoryIcon = category => {
    // Find the category in the complete list (default + custom)
    const foundCategory = categories.find(cat => cat.id === category);
    return foundCategory?.icon || 'key'; // fallback to 'key' if not found
  };

  const handleFavoriteToggle = async () => {
    try {
      const result = await toggleFavorite(item.id);
      if (result.success) {
        onRefresh?.();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
    hideActionSheet();
  };

  const handleEdit = () => {
    hideActionSheet();
    onEdit?.(item);
  };

  const handleDelete = () => {
    hideActionSheet();
    Alert.alert(
      'Delete Credential',
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await credentialsStorage.deleteCredential(
                user.id,
                item.id,
              );
              if (result.success) {
                onRefresh?.();
              }
            } catch (error) {
              console.error('Error deleting credential:', error);
            }
          },
        },
      ],
    );
  };

  const handleView = () => {
    hideActionSheet();
    onPress?.(item);
  };

  const handleLongPress = () => {
    const options = [
      {
        text: item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
        onPress: handleFavoriteToggle,
      },
      {
        text: 'View Details',
        onPress: handleView,
      },
      {
        text: 'Edit',
        onPress: handleEdit,
      },
      {
        text: 'Delete',
        onPress: handleDelete,
        style: 'destructive',
      },
    ];

    showActionSheet(item.title, 'Choose an action', options);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress?.(item)}
        onLongPress={handleLongPress}
        className="bg-background-card dark:bg-dark-background-card border border-border dark:border-dark-border rounded-lg p-4 mb-3"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 rounded-lg bg-background-muted dark:bg-dark-background-muted items-center justify-center mr-3">
              <Lucide
                name={getCategoryIcon(item.category)}
                size={20}
                color="#3B82F6"
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between ">
                <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-base flex-1">
                  {item.title}
                </Text>
                {item.passwordStrength === 'weak' && (
                  <View className="bg-danger/10 px-2 py-1 rounded-full flex-row items-center ml-2">
                    <Lucide name="shield-alert" size={12} color="#EF4444" />
                    <Text className="text-danger font-sans-medium text-xs ml-1">
                      Weak
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
                {item.username}
              </Text>
            </View>
          </View>
          <Lucide name="chevron-right" size={20} color="#71717A" />
        </View>
        {item.url && (
          <Text
            className="text-foreground-secondary dark:text-dark-foreground-secondary font-sans text-xs"
            numberOfLines={1}
          >
            {item.url}
          </Text>
        )}
      </TouchableOpacity>

      <IosActionSheet
        visible={actionSheet.visible}
        title={actionSheet.title}
        message={actionSheet.message}
        options={actionSheet.options}
        onClose={hideActionSheet}
      />
    </>
  );
}
