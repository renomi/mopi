import Entypo from '@expo/vector-icons/Entypo';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '@/core/auth';

export default function Layout() {
  const status = useAuth.use.status();

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [status]);

  // if (status === 'signOut') return <Redirect href="/login" />;

  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="leaf" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
