import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { toast } from 'sonner-native';

import { getErrorMessage } from '@/core/api';
import { useLogin } from '@/core/api/auth';
import { signIn } from '@/core/auth';
import { Button, ControlledInput } from '@/ui';
import { loginSchema, LoginSchema } from '@/utils/validation';

import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import logoImage from '@/assets/images/logo-bpjsk.png'; // Ensure correct path

const DEFAULT_OFFSET = 50;

export default function LogInScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();
  const [isPeek, toggleIsPeek] = useReducer((state) => !state, true);
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const [tokenFcm, setTokenFCM] = useState('')

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    const payload = {
      ...data,
      token_fcm: tokenFcm
    }
    login(payload, {
      onSuccess: (response) => {
        const authToken = response?.access_token;

        if (authToken) {
          signIn({ access: authToken });
          router.push('/');
        }
      },
      onError: (err) => {
        const message = getErrorMessage(err);

        toast.error(message);
      },
    });
  };

  // Request user permission for notifications
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  // Set up notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      icon: logoImage
    }),
  });

  useEffect(() => {
    // Request permission and get FCM token
    requestUserPermission().then(async () => {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      setTokenFCM(token);
    });

    // Handle click events on notifications
    const handleNotificationClick = async (response) => {
      // const screen = response?.notification?.request?.content?.data?.screen;
      // if (screen) {
      //   navigation.navigate(screen);
      // }
      console.log("Notification clicked:", response);
    };

    // Listen for when a user clicks on a notification
    const notificationClickSubscription = Notifications.addNotificationResponseReceivedListener(handleNotificationClick);

    // Open app from background on notification
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("App opened from background state:", remoteMessage.data.screen);
      // if (remoteMessage?.data?.screen) {
      // navigation.navigate(remoteMessage.data.screen);
      // }
    });

    // Open app from quit state
    messaging().getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log("App opened from quit state:", remoteMessage.notification);
        // if (remoteMessage?.data?.screen) {
        // navigation.navigate(remoteMessage.data.screen);
        // }
      }
    });

    // Background notification handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in background:", remoteMessage);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          data: remoteMessage.data,
        },
        trigger: null,
      });
    });

    // Foreground notification handler
    const handlePushNotification = async (remoteMessage) => {
      console.log('Message handled in foreground:', remoteMessage);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          data: remoteMessage.data,
        },
        trigger: null,
      });
    };

    // Listen for foreground notifications
    const unsubscribeForeground = messaging().onMessage(handlePushNotification);

    // Clean up listeners on component unmount
    return () => {
      unsubscribeForeground();
      notificationClickSubscription.remove();
    };
  }, []);


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.screen}
      bottomOffset={DEFAULT_OFFSET}
    >
      <Image
        source={require('@/assets/images/logo-bpjsk.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <ControlledInput
          name="email"
          control={control}
          label="Email"
          placeholder="email"
          keyboardType="email-address"
        />
        <ControlledInput
          name="password"
          control={control}
          label="Password"
          placeholder="password"
          secureTextEntry={isPeek}
          RightAccessory={() => (
            <Ionicons
              onPress={toggleIsPeek}
              name={isPeek ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.palette.neutral500}
            />
          )}
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        variant="brand"
        text="Submit"
      />
    </KeyboardAwareScrollView>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  screen: {
    flexGrow: 1,
    paddingTop: runtime.insets.top,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 140,
    height: 140,
    marginVertical: theme.spacing.lg,
    alignSelf: 'center',
  },
  formContainer: {
    rowGap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
}));
