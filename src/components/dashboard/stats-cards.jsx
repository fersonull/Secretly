import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function StatsCards({
  total,
  strong,
  weak,
  duplicates,
  onCardPress,
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
        onPress={() => onCardPress?.('total')}
      />
      <StatCard
        icon="shield-check"
        label="Strong"
        value={strong}
        iconColor="#10B981"
        textColor="#10B981"
        onPress={() => onCardPress?.('strong')}
      />
      <StatCard
        icon="shield-alert"
        label="Weak"
        value={weak}
        iconColor="#EF4444"
        textColor="#EF4444"
        onPress={() => onCardPress?.('weak')}
      />
      <StatCard
        icon="copy"
        label="Duplicates"
        value={duplicates}
        iconColor="#F59E0B"
        textColor="#F59E0B"
        onPress={() => onCardPress?.('duplicates')}
      />
    </ScrollView>
  );
}

function StatCard({ icon, label, value, iconColor, textColor, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background-card dark:bg-dark-background-card border border-border dark:border-dark-border rounded-2xl p-4 min-w-[140px]"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Lucide name={icon} size={24} color={iconColor} />
        <Text className="text-foreground-muted dark:text-dark-foreground-muted font-sans text-xs">
          {label}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="font-sans-bold text-3xl" style={{ color: textColor }}>
          {value}
        </Text>
        <Lucide name="chevron-right" size={20} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
}
