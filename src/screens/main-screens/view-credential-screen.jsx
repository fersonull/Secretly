import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCredentials } from '../../hooks/use-credentials';
import IosLoading from '../../components/ui/ios-loading';
import CredentialHeader from '../../components/credential/credential-header';
import CredentialDetails from '../../components/credential/credential-details';
import { useEffect, useState } from 'react';

export default function ViewCredentialScreen() {
  const [credential, setCredential] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const { getCredentialById, isLoading, refresh, deleteCredential } =
    useCredentials();

  useEffect(() => {
    const cred = getCredentialById(id);

    console.log(id);
    console.log(cred);

    setCredential(cred);
  }, [isLoading]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    if (credential) {
      navigation.navigate('AddEditCredential', { id: credential.id });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteCredential(credential.id);
      if (result.success) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error deleting credential:', error);
    }
  };

  const handleToggleFavorite = () => {
    refresh(); // Refresh the data after favorite toggle
  };

  if (isLoading || !credential) {
    return (
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
        <IosLoading visible={true} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CredentialHeader
          credential={credential}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />

        <CredentialDetails credential={credential} />
      </ScrollView>
    </SafeAreaView>
  );
}
