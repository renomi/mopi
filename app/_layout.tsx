import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';
import 'react-native-reanimated';

import '@/styles';
import { APIProvider } from '@/core/api';
import { hydrateAuth } from '@/core/auth';
import { initI18n } from '@/core/i18n';

SplashScreen.preventAutoHideAsync();
hydrateAuth();

export default function RootLayout() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => {
      setIsI18nInitialized(true);
    });
  }, []);

  if (!isI18nInitialized) return null;

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <APIProvider>
        <KeyboardProvider>{children}</KeyboardProvider>
      </APIProvider>
      <Toaster />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
