import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide';
import AppHeader from '../../components/common/app-header';
import CredentialCard from '../../components/ui/credential-card';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_CREDENTIALS = [
  {
    id: '1',
    title: 'Facebook',
    username: 'john.doe@email.com',
    category: 'social',
    url: 'https://facebook.com',
  },
  {
    id: '2',
    title: 'Chase Bank',
    username: 'johndoe',
    category: 'banking',
    url: 'https://chase.com',
  },
  {
    id: '3',
    title: 'Gmail',
    username: 'john.doe@gmail.com',
    category: 'email',
    url: 'https://gmail.com',
  },
  {
    id: '4',
    title: 'Amazon',
    username: 'john_doe',
    category: 'shopping',
    url: 'https://amazon.com',
  },
  {
    id: '5',
    title: 'LinkedIn',
    username: 'john-doe',
    category: 'social',
    url: 'https://linkedin.com',
  },
  {
    id: '6',
    title: 'Work Email',
    username: 'john.doe@company.com',
    category: 'work',
    url: 'https://outlook.office.com',
  },
  {
    id: '7',
    title: 'Work Email',
    username: 'john.doe@company.com',
    category: 'work',
    url: 'https://outlook.office.com',
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCredentials = MOCK_CREDENTIALS.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <AppHeader title="Dashboard" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="px-4 pt-4 pb-2">
          <View className="bg-background-muted dark:bg-dark-background-muted border border-border dark:border-dark-border rounded-lg flex-row items-center px-3">
            <Lucide name="search" size={20} color="#71717A" />
            <TextInput
              className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
              placeholder="Search credentials..."
              placeholderTextColor="#71717A"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Stats Cards */}
        <View className="py-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            <View className="bg-primary rounded-lg p-4 min-w-[140px]">
              <Text className="text-white font-sans-bold text-2xl mb-1">
                {MOCK_CREDENTIALS.length}
              </Text>
              <Text className="text-white/80 font-sans text-sm">
                Total Credentials
              </Text>
            </View>
            <View className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-4 min-w-[140px]">
              <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl mb-1">
                {MOCK_CREDENTIALS.filter(c => c.category === 'social').length}
              </Text>
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
                Social Media
              </Text>
            </View>
            <View className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-4 min-w-[140px]">
              <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl mb-1">
                {MOCK_CREDENTIALS.filter(c => c.category === 'banking').length}
              </Text>
              <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-sm">
                Banking
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* Recent Credentials */}
        <View className="px-4 pb-24">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-lg">
              Recent Credentials
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CredentialList')}
            >
              <Text className="text-primary font-sans-medium text-sm">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {filteredCredentials.map(item => (
            <CredentialCard
              key={item.id}
              item={item}
              onPress={() =>
                navigation.navigate('ViewCredential', { id: item.id })
              }
            />
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditCredential')}
        className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center"
        style={{
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <Lucide name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
