import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCredentials } from '../../hooks/use-credentials';
import IosAlert from '../../components/ui/ios-alert';
import IosToast from '../../components/ui/ios-toast';
import IosLoading from '../../components/ui/ios-loading';
import { useToast } from '../../hooks/use-toast';
import { useAlert } from '../../hooks/use-alert';

export default function ViewCredentialScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const credentialId = route.params?.id;

  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { alert, showAlert, hideAlert } = useAlert();
  const {
    credentials,
    getCredentialById,
    deleteCredential,
    isLoading: credentialsLoading,
  } = useCredentials();

  useEffect(() => {
    // Only try to get credential after credentials are loaded
    if (!credentialsLoading && credentialId) {
      const data = getCredentialById(credentialId);
      console.log('Credential data:', data);
      setCredential(data);

      if (!data) {
        showAlert('Error', 'Credential not found', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    }
  }, [credentialId, credentials, credentialsLoading, getCredentialById]);

  const copyToClipboard = (text, label) => {
    // In production, use Clipboard.setString(text)
    showToast('success', `${label} copied to clipboard`);
  };

  const handleEdit = () => {
    navigation.navigate('AddEditCredential', { id: credentialId });
  };

  const handleDelete = () => {
    showAlert(
      'Delete Credential',
      'Are you sure you want to delete this credential? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel', onPress: hideAlert },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            hideAlert();
            setIsLoading(true);
            const result = await deleteCredential(credentialId);
            setIsLoading(false);

            if (result.success) {
              navigation.goBack();
              showToast('success', 'Credential deleted successfully');
            } else {
              showAlert(
                'Error',
                result.error || 'Failed to delete credential',
                [{ text: 'OK', onPress: hideAlert }],
              );
            }
          },
        },
      ],
    );
  };

  if (credentialsLoading || !credential) {
    return (
      <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans">
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      {/* Custom Header with Actions */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border dark:border-dark-border">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center"
        >
          <Lucide name="arrow-left" size={22} color="#3B82F6" />
        </TouchableOpacity>
        <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
          Credential Details
        </Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={handleEdit}
            className="w-10 h-10 items-center justify-center"
          >
            <Lucide name="edit-2" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="w-10 h-10 items-center justify-center ml-2"
          >
            <Lucide name="trash-2" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Icon and Title */}
        <View className="items-center py-6 border-b border-border dark:border-dark-border">
          <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-3">
            <Lucide name="share-2" size={28} color="#3B82F6" />
          </View>
          <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl mb-1">
            {credential.title}
          </Text>
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
            {credential.category.charAt(0).toUpperCase() +
              credential.category.slice(1)}
          </Text>
        </View>

        {/* Credential Fields */}
        <View className="p-4">
          {/* Username */}
          <View className="mb-4">
            <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
              USERNAME / EMAIL
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-between">
              <Text className="text-foreground dark:text-dark-foreground font-sans-medium flex-1">
                {credential.username}
              </Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(credential.username, 'Username')}
                className="ml-3"
              >
                <Lucide name="copy" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
              PASSWORD
            </Text>
            <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-between">
              <Text className="text-foreground dark:text-dark-foreground font-sans-medium flex-1">
                {showPassword ? credential.password : '••••••••••••'}
              </Text>
              <View className="flex-row items-center ml-3">
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="mr-3"
                >
                  <Lucide
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color="#71717A"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyToClipboard(credential.password, 'Password')
                  }
                >
                  <Lucide name="copy" size={18} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* URL */}
          {credential.url && (
            <View className="mb-4">
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
                WEBSITE URL
              </Text>
              <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4 flex-row items-center justify-between">
                <Text className="text-primary dark:text-primary font-sans-medium flex-1">
                  {credential.url}
                </Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(credential.url, 'URL')}
                  className="ml-3"
                >
                  <Lucide name="external-link" size={18} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Notes */}
          {credential.notes && (
            <View className="mb-4">
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-2">
                NOTES
              </Text>
              <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg p-4">
                <Text className="text-foreground dark:text-dark-foreground font-sans leading-5">
                  {credential.notes}
                </Text>
              </View>
            </View>
          )}

          {/* Metadata */}
          <View className="bg-background-secondary dark:bg-dark-background-secondary rounded-lg p-4 mt-2">
            <View className="flex-row items-center mb-2">
              <Lucide name="calendar" size={16} color="#71717A" />
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm ml-2">
                Created: {credential.createdAt?.split('T')[0] || 'N/A'}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Lucide name="clock" size={16} color="#71717A" />
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm ml-2">
                Last updated: {credential.updatedAt?.split('T')[0] || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <IosAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        buttons={alert.buttons}
        onClose={hideAlert}
      />

      <IosToast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onHide={hideToast}
      />

      <IosLoading visible={isLoading} message="Deleting..." />
    </SafeAreaView>
  );
}
