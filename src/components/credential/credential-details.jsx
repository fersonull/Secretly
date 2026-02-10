import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from '../../hooks/use-toast';

export default function CredentialDetails({ credential }) {
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();

  const copyToClipboard = (text, label) => {
    Clipboard.setString(text);
    showToast(`${label} copied to clipboard`, 'success');
  };

  const handleCopyUsername = () => {
    copyToClipboard(credential.username, 'Username');
  };

  const handleCopyPassword = () => {
    copyToClipboard(credential.password, 'Password');
  };

  const handleCopyUrl = () => {
    copyToClipboard(credential.url, 'URL');
  };

  const DetailRow = ({
    label,
    value,
    onCopy,
    showCopyButton = true,
    isPassword = false,
  }) => {
    if (!value) return null;

    return (
      <View className="mb-6">
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans-medium text-sm mb-2 uppercase tracking-wide">
          {label}
        </Text>
        <View className="flex-row items-center justify-between bg-background-card dark:bg-dark-background-card p-4 rounded-lg border border-border dark:border-dark-border">
          <Text className="text-foreground dark:text-dark-foreground font-sans text-base flex-1 mr-3">
            {isPassword && !showPassword ? '•'.repeat(value.length) : value}
          </Text>
          <View className="flex-row items-center">
            {isPassword && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-2 mr-1"
              >
                <Lucide
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            )}
            {showCopyButton && (
              <TouchableOpacity onPress={onCopy} className="p-2">
                <Lucide name="copy" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="px-6 py-6">
      <DetailRow
        label="Username"
        value={credential.username}
        onCopy={handleCopyUsername}
      />
      <DetailRow
        label="Password"
        value={credential.password}
        onCopy={handleCopyPassword}
        isPassword={true}
      />
      <DetailRow
        label="Website"
        value={credential.url}
        onCopy={handleCopyUrl}
      />
      {credential.notes && (
        <DetailRow
          label="Notes"
          value={credential.notes}
          showCopyButton={false}
        />
      )}

      <View className="mt-6 pt-6 border-t border-border dark:border-dark-border">
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
          Created: {new Date(credential.createdAt).toLocaleDateString()}
        </Text>
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm mt-1">
          Last updated: {new Date(credential.updatedAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
