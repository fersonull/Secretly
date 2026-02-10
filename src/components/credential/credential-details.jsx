import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from '../../hooks/use-toast';
import OpenUrlButton from '../../components/credential/open-url-button';

export default function CredentialDetails({ credential }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const { showToast } = useToast();

  console.log(credential);

  const copyToClipboard = (text, label, fieldName) => {
    Clipboard.setString(text);
    showToast(`${label} copied to clipboard`, 'success');

    // Show checkmark feedback
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleCopyUsername = () => {
    copyToClipboard(credential.username, 'Username', 'username');
  };

  const handleCopyPassword = () => {
    copyToClipboard(credential.password, 'Password', 'password');
  };

  const handleCopyUrl = () => {
    copyToClipboard(credential.url, 'URL', 'url');
  };

  const DetailRow = ({
    label,
    value,
    onCopy,
    showCopyButton = true,
    isPassword = false,
    fieldName,
  }) => {
    if (!value) return null;

    const isCopied = copiedField === fieldName;

    return (
      <View className="mb-6">
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans-medium text-sm mb-2 uppercase tracking-wide">
          {label}
        </Text>
        <View className="flex-row items-center justify-between bg-background-card dark:bg-dark-background-card p-4 rounded-lg border border-border dark:border-dark-border">
          <Text
            className={` font-sans text-base flex-1 mr-3 ${
              fieldName === 'url'
                ? 'text-primary'
                : 'text-foreground dark:text-dark-foreground'
            }`}
          >
            {isPassword && !showPassword ? '•'.repeat(value.length) : value}
          </Text>
          <View className="flex-row items-center">
            {isPassword && (
              <TouchableOpacity
                activeOpacity={0.7}
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
            {showCopyButton && fieldName !== 'url' ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCopy}
                className="p-2"
              >
                <Lucide
                  name={isCopied ? 'check' : 'copy'}
                  size={20}
                  color={isCopied ? '#10B981' : '#6B7280'}
                />
              </TouchableOpacity>
            ) : (
              <OpenUrlButton url={value} className="p-2">
                <Lucide
                  name="square-arrow-out-up-right"
                  size={20}
                  color="#3B82F6"
                />
              </OpenUrlButton>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="px-6 py-6">
      <DetailRow
        label="Username / Email"
        value={credential.username}
        onCopy={handleCopyUsername}
        fieldName="username"
      />
      <DetailRow
        label="Password"
        value={credential.password}
        onCopy={handleCopyPassword}
        isPassword={true}
        fieldName="password"
      />
      {credential.url && (
        <DetailRow
          label="Website"
          value={credential.url}
          onCopy={handleCopyUrl}
          fieldName="url"
        />
      )}
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
