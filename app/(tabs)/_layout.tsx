import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';

import { useAuth } from '@/core/auth';

export default function Layout() {
  const { theme } = useStyles();
  const status = useAuth.use.status();

  useEffect(() => {
    if (status !== 'idle') {
      SplashScreen.hideAsync();
    }
  }, [status]);

  if (status === 'signOut') return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: theme.spacing.xxs,
        },
        tabBarActiveTintColor: theme.colors.palette.brand500,
        tabBarInactiveTintColor: theme.colors.palette.neutral500,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Beranda',
          tabBarShowLabel: true,
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
