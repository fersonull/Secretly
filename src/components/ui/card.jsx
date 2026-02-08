import { View, Text } from 'react-native';

export function Card({ children }) {
  return <View className=" border w-full max-w-sm rounded">{children}</View>;
}

export function CardHeader({ children }) {
  return <View className="p-2">{children}</View>;
}
