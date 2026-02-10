import { Linking, TouchableOpacity } from 'react-native';
import { useToast } from '../../hooks/use-toast';

export default function OpenUrlButton({ url, children, className, ...props }) {
  const { showToast } = useToast();

  const handlePress = async () => {
    if (!url) {
      showToast('No URL provided', 'error');
      return;
    }

    try {
      // Ensure the URL has a protocol
      let formattedUrl = url.trim();
      if (
        !formattedUrl.startsWith('http://') &&
        !formattedUrl.startsWith('https://')
      ) {
        formattedUrl = `https://${formattedUrl}`;
      }

      // Check if the device can handle the URL
      const supported = await Linking.canOpenURL(formattedUrl);

      if (supported) {
        await Linking.openURL(formattedUrl);
      } else {
        showToast(`Cannot open URL: ${url}`, 'error');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      showToast('Failed to open URL', 'error');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={className}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
