import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function StatsCards({
  total,
  strong,
  weak,
  duplicates,
  onOrganizePress,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3"
      className="py-3"
    >
      <StatCard
        icon="key"
        label="Total"
        value={total}
        iconColor="#3B82F6"
        textColor="#3B82F6"
      />
      <StatCard
        icon="shield-check"
        label="Strong"
        value={strong}
        iconColor="#10B981"
        textColor="#10B981"
      />
      <StatCard
        icon="shield-alert"
        label="Weak"
        value={weak}
        iconColor="#EF4444"
        textColor="#EF4444"
      />
      <StatCard
        icon="copy"
        label="Duplicates"
        value={duplicates}
        iconColor="#F59E0B"
        textColor="#F59E0B"
      />
      <OrganizeCard onPress={onOrganizePress} />
    </ScrollView>
  );
}

function StatCard({ icon, label, value, iconColor, textColor }) {
  return (
    <View className="bg-background-card dark:bg-dark-background-card border border-border dark:border-dark-border rounded-2xl p-4 min-w-[140px]">
      <View className="flex-row items-center justify-between mb-2">
        <Lucide name={icon} size={24} color={iconColor} />
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs">
          {label}
        </Text>
      </View>
      <Text className="font-sans-bold text-3xl" style={{ color: textColor }}>
        {value}
      </Text>
    </View>
  );
}

function OrganizeCard({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary/10 border border-primary/20 rounded-2xl p-4 min-w-[140px]"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Lucide name="layout-grid" size={24} color="#3B82F6" />
        <Text className="text-primary font-sans text-xs">View All</Text>
      </View>
      <Text className="text-primary font-sans-bold text-lg">Organize</Text>
    </TouchableOpacity>
  );
}
