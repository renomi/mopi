import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';

import '@/styles';
import { APIProvider } from '@/core/api';
import { initI18n } from '@/core/i18n';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => {
      SplashScreen.hideAsync().then(() => setIsI18nInitialized(true));
    });
  }, []);

  if (!isI18nInitialized) return null;

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" />
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
