import { View, Text, ScrollView } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function StatsCards({ total, strong, weak }) {
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
        color="bg-primary"
        iconColor="#FFFFFF"
      />
      <StatCard
        icon="shield-check"
        label="Strong"
        value={strong}
        color="bg-success"
        iconColor="#FFFFFF"
      />
      <StatCard
        icon="shield-alert"
        label="Weak"
        value={weak}
        color="bg-danger"
        iconColor="#FFFFFF"
      />
    </ScrollView>
  );
}

function StatCard({ icon, label, value, color, iconColor }) {
  return (
    <View className={`${color} rounded-2xl p-4 min-w-[140px]`}>
      <View className="flex-row items-center justify-between mb-2">
        <Lucide name={icon} size={24} color={iconColor} />
        <Text className="text-white/80 font-sans text-xs">{label}</Text>
      </View>
      <Text className="text-white font-sans-bold text-3xl">{value}</Text>
    </View>
  );
}
