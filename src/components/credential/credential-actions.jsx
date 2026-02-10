import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { useAuth } from '../../context/auth-context';
import { credentialsStorage } from '../../services/credentials-storage';

export default function CredentialActions({ credential, onEdit, onDelete, onToggleFavorite }) {
  const { user } = useAuth();

  const handleDelete = () => {
    Alert.alert(
      'Delete Credential',
      `Are you sure you want to delete "${credential.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  const handleToggleFavorite = async () => {
    try {
      const result = await credentialsStorage.toggleFavorite(user.id, credential.id);
      if (result.success) {
        onToggleFavorite?.();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <View className="px-6 py-4 border-t border-border dark:border-dark-border">
      <View className="flex-row justify-center space-x-4">
        <TouchableOpacity
          onPress={handleToggleFavorite}
          className="flex-1 bg-background-card dark:bg-dark-background-card border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-center mr-2"
          activeOpacity={0.7}
        >
          <Lucide
            name={credential.isFavorite ? 'heart' : 'heart'}
            size={20}
            color={credential.isFavorite ? '#EF4444' : '#6B7280'}
            fill={credential.isFavorite ? '#EF4444' : 'transparent'}
          />
          <Text className="text-foreground dark:text-dark-foreground font-sans-medium text-base ml-2">
            {credential.isFavorite ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onEdit}
          className="flex-1 bg-primary border border-primary rounded-lg p-4 flex-row items-center justify-center mx-1"
          activeOpacity={0.7}
        >
          <Lucide name="edit" size={20} color="#FFFFFF" />
          <Text className="text-white font-sans-medium text-base ml-2">
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          className="flex-1 bg-danger border border-danger rounded-lg p-4 flex-row items-center justify-center ml-2"
          activeOpacity={0.7}
        >
          <Lucide name="trash-2" size={20} color="#FFFFFF" />
          <Text className="text-white font-sans-medium text-base ml-2">
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}