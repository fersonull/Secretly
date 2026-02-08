import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { IconLogo } from './icon-logo';
import { Logo } from './logo';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerClassName="flex-1">
      <View className="px-6 pt-6 pb-4 border-b border-border dark:border-dark-border">
        <IconLogo />
        <Logo />
        <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans">
          Securely store your credentials
        </Text>
      </View>
      <View className="flex-1 px-4 pt-4">
        <DrawerItemList {...props} />
      </View>
      <View className="px-6 py-5 border-t border-border dark:border-dark-border">
        <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans text-xs">
          Version 1.0.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}
