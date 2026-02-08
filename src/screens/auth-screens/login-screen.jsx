import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Add your login logic here
    setTimeout(() => {
      setIsLoading(false);
      // navigation.navigate('Main');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-20 pb-8">
            {/* Logo/Icon Section */}
            <View className="items-center mb-12">
              <View className="bg-primary dark:bg-dark-primary w-20 h-20 rounded-2xl items-center justify-center mb-4">
                <Lucide name="shield-lock" size={40} color="hsl(210 40% 98%)" />
              </View>

              <Text className="text-foreground dark:text-dark-foreground font-dancing-bold text-4xl mb-2">
                SecureVault
              </Text>

              <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans text-center">
                Your personal credentials manager
              </Text>
            </View>

            {/* Form Section */}
            <View className="mb-6">
              <Text className="text-foreground dark:text-dark-foreground font-sans-bold text-2xl mb-2">
                Welcome back
              </Text>
              <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans">
                Enter your credentials to access your vault
              </Text>
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-sans-medium text-foreground dark:text-dark-foreground mb-2">
                Email
              </Text>
              <View className="bg-background dark:bg-dark-background border border-input dark:border-dark-input rounded-md flex-row items-center px-3">
                <Lucide name="mail" size={20} color="hsl(215.4 16.3% 46.9%)" />
                <TextInput
                  className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
                  placeholder="Enter your email"
                  placeholderTextColor="hsl(215.4 16.3% 46.9%)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-2">
              <Text className="text-sm font-sans-medium text-foreground dark:text-dark-foreground mb-2">
                Master Password
              </Text>
              <View className="bg-background dark:bg-dark-background border border-input dark:border-dark-input rounded-md flex-row items-center px-3">
                <Lucide name="lock" size={20} color="hsl(215.4 16.3% 46.9%)" />
                <TextInput
                  className="flex-1 py-3 px-3 text-foreground dark:text-dark-foreground font-sans"
                  placeholder="Enter your master password"
                  placeholderTextColor="hsl(215.4 16.3% 46.9%)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-1"
                >
                  <Lucide
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="hsl(215.4 16.3% 46.9%)"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-primary dark:text-dark-primary font-sans-medium text-sm">
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-primary dark:bg-dark-primary rounded-md py-3.5 mb-4 active:opacity-90"
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-primary-foreground dark:text-dark-primary-foreground font-sans-bold text-center text-base">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-border dark:bg-dark-border" />
              <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans text-sm px-4">
                or
              </Text>
              <View className="flex-1 h-px bg-border dark:bg-dark-border" />
            </View>

            {/* Biometric Login */}
            <TouchableOpacity className="bg-secondary dark:bg-dark-secondary rounded-md py-3.5 mb-6 border border-border dark:border-dark-border flex-row items-center justify-center">
              <Lucide
                name="fingerprint"
                size={20}
                color="hsl(222.2 47.4% 11.2%)"
                style={{ marginRight: 8 }}
              />
              <Text className="text-secondary-foreground dark:text-dark-secondary-foreground font-sans-medium text-base">
                Use biometrics
              </Text>
            </TouchableOpacity>

            {/* Spacer */}
            <View className="flex-1" />

            {/* Sign Up Link */}
            <View className="flex-row items-center justify-center pt-6">
              <Text className="text-muted-foreground dark:text-dark-muted-foreground font-sans">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-primary dark:text-dark-primary font-sans-bold">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
