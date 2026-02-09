import { View, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Lucide from '@react-native-vector-icons/lucide';
import { IconLogo } from './icon-logo';
import { Logo } from './logo';
import { useAuth } from '../../context/auth-context';
import IosAlert from '../ui/ios-alert';
import IosToast from '../ui/ios-toast';
import { useAlert } from '../../hooks/use-alert';
import { useToast } from '../../hooks/use-toast';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  const { alert, showAlert, hideAlert } = useAlert();
  const { toast, showToast, hideToast } = useToast();

  const handleLogout = () => {
    showAlert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel', onPress: hideAlert },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            hideAlert();
            const result = await logout();
            if (result.success) {
              showToast('success', 'Logged out successfully');
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerClassName="flex-1 bg-background dark:bg-dark-background"
        className="bg-background dark:bg-dark-background"
      >
        <View className="px-6 pt-4 pb-4 border-b border-border dark:border-dark-border">
          <IconLogo />
          <Logo />
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
            Securely store your credentials
          </Text>
          {user && (
            <View className="mt-3 bg-background-secondary dark:bg-dark-background-secondary rounded-lg p-3">
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mb-1">
                Logged in as
              </Text>
              <Text className="text-foreground dark:text-dark-foreground font-sans-medium text-sm">
                {user.email}
              </Text>
            </View>
          )}
        </View>
        <View className="flex-1 px-4 py-3">
          <DrawerItemList {...props} />
        </View>
        
        {/* Logout Button */}
        <View className="px-4 pb-4">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center bg-danger/10 dark:bg-danger/20 rounded-lg px-4 py-3 border border-danger/30"
            activeOpacity={0.7}
          >
            <Lucide name="log-out" size={20} color="#EF4444" />
            <Text className="text-danger font-sans-medium text-base ml-3 flex-1">
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 py-4 border-t border-border dark:border-dark-border">
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs">
            Version 1.0.0
          </Text>
          <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs mt-1">
            Trusted by teams worldwide
          </Text>
        </View>
      </DrawerContentScrollView>

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
    </>
  );
}
