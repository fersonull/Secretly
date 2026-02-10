import { View, Text } from 'react-native';
import { useMemo } from 'react';
import { calculatePasswordStrength } from '../../utils/password-strength';

export default function PasswordStrengthMeter({ password }) {
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);

  if (!password) return null;

  return (
    <View className="mt-2">
      {/* Strength Bars */}
      <View className="flex-row gap-1 mb-2">
        {[1, 2, 3, 4].map(level => (
          <View
            key={level}
            className={`flex-1 h-1 rounded-full ${
              level <= strength.score
                ? strength.barColor
                : 'bg-background-muted dark:bg-dark-background-muted'
            }`}
          />
        ))}
      </View>

      {/* Strength Label */}
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="font-sans-medium text-xs"
          style={{ color: strength.color }}
        >
          {strength.label}
        </Text>
      </View>

      {/* Requirements Checklist */}
      <View className="space-y-1">
        <RequirementItem
          met={strength.checks?.length}
          text="At least 8 characters"
        />
        <RequirementItem
          met={strength.checks?.hasUpper}
          text="One uppercase letter"
        />
        <RequirementItem
          met={strength.checks?.hasLower}
          text="One lowercase letter"
        />
        <RequirementItem
          met={strength.checks?.hasNumber}
          text="One number"
        />
        <RequirementItem
          met={strength.checks?.hasSpecial}
          text="One special character"
        />
      </View>
    </View>
  );
}

function RequirementItem({ met, text }) {
  return (
    <View className="flex-row items-center mb-1">
      <View
        className={`w-4 h-4 rounded-full items-center justify-center mr-2 ${
          met ? 'bg-success' : 'bg-background-muted dark:bg-dark-background-muted'
        }`}
      >
        {met && (
          <Text className="text-white text-xs font-sans-bold">✓</Text>
        )}
      </View>
      <Text
        className={`font-sans text-xs ${
          met
            ? 'text-foreground dark:text-dark-foreground'
            : 'text-foreground-muted dark:text-dark-foreground-muted'
        }`}
      >
        {text}
      </Text>
    </View>
  );
}
