import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/common/app-header';
import SettingsSection from '../../components/settings/settings-section';
import SettingsItem from '../../components/settings/settings-item';
import IosSwitch from '../../components/ui/ios-switch';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../hooks/use-toast';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleChangePassword = () => {
    showToast('Change password feature coming soon!', 'info');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            showToast('Logged out successfully', 'success');
          }
        }
      ]
    );
  };

  const handleAutoLock = () => {
    showToast('Auto-lock settings coming soon!', 'info');
  };

  const handleClipboardTimer = () => {
    showToast('Clipboard timer settings coming soon!', 'info');
  };

  const handleDarkModeToggle = (value) => {
    showToast('Dark mode toggle coming soon!', 'info');
  };

  const handleExportData = () => {
    showToast('Export data feature coming soon!', 'info');
  };

  const handleImportData = () => {
    showToast('Import data feature coming soon!', 'info');
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your credentials and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            showToast('Clear all data feature coming soon!', 'info');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <AppHeader title="Settings" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem
            title="Email"
            subtitle={user?.email || 'No email set'}
            icon="mail"
            showChevron={false}
          />
          <SettingsItem
            title="Change Password"
            subtitle="Update your account password"
            icon="key"
            onPress={handleChangePassword}
          />
          <SettingsItem
            title="Logout"
            icon="log-out"
            onPress={handleLogout}
            destructive={true}
            isLast={true}
          />
        </SettingsSection>

        {/* Security Section */}
        <SettingsSection title="Security">
          <SettingsItem
            title="Auto-lock"
            subtitle="Lock app after inactivity"
            icon="lock"
            onPress={handleAutoLock}
          />
          <SettingsItem
            title="Clipboard Timer"
            subtitle="Auto-clear copied passwords"
            icon="clipboard"
            onPress={handleClipboardTimer}
            isLast={true}
          />
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="Appearance">
          <SettingsItem
            title="Dark Mode"
            subtitle="Use dark theme"
            icon="moon"
            rightElement={
              <IosSwitch
                value={false}
                onValueChange={handleDarkModeToggle}
              />
            }
            showChevron={false}
            isLast={true}
          />
        </SettingsSection>

        {/* Data Section */}
        <SettingsSection title="Data">
          <SettingsItem
            title="Export Data"
            subtitle="Save your credentials to file"
            icon="download"
            onPress={handleExportData}
          />
          <SettingsItem
            title="Import Data"
            subtitle="Load credentials from file"
            icon="upload"
            onPress={handleImportData}
          />
          <SettingsItem
            title="Clear All Data"
            subtitle="Delete all credentials permanently"
            icon="trash-2"
            onPress={handleClearAllData}
            destructive={true}
            isLast={true}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
