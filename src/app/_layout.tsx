import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="role-selection" />
        <Stack.Screen name="manufacturer-dashboard" />
        <Stack.Screen name="product-assessment" />
        <Stack.Screen name="compliance-report" />
        <Stack.Screen name="certification-journey" />
        <Stack.Screen name="laboratory-finder" />
        <Stack.Screen name="ai-assistant" />
      </Stack>
    </ThemeProvider>
  );
}
